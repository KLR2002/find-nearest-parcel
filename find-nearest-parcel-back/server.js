import { Hono } from 'hono'
import { cors } from 'hono/cors'
import axios from 'axios'

const app = new Hono()
const API = 'https://api-global-points.easypack24.net/v1/points'

app.use(
  '*',
  cors({
    origin:[
      'http://localhost:5173', 
      'http://localhost:5174',
      'http://localhost:3000', 
      'http://localhost:8000'
    ],
  })
)

// haversine if distance not provided
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}


// search by coords/address endpoint
app.get('/api/parcels', async (c) => {
  let lat = c.req.query('lat')
  let lon = c.req.query('lon')
  const address = c.req.query('address')

  try {
    const params = { 
      type: 'parcel_locker',
      per_page: 50 
    };

    if (lat && lon) {
      params.relative_point = `${lat},${lon}`;
    } else if (address) {
      try {
        // If lat and lon not provided, convert address to them with nominatim API
        const geoUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`;
        
        const geoRes = await axios.get(geoUrl, {
          // OpenStreetMap requires a User-Agent header with unique app handle so i put random uuid
          headers: { 'User-Agent': '15b1573f-d6eb-4e4d-bb14-db50be05f444/1.0' } 
        });
        
        if (geoRes.data && geoRes.data.length > 0) {
          lat = geoRes.data[0].lat;
          lon = geoRes.data[0].lon;
          params.relative_point = `${lat},${lon}`;
        }
      } catch (geoError) {
        console.warn('Geocoding failed, falling back to basic text search', geoError.message);
        console.log(geoError)
      }
    }

    let response = await axios.get(API, { params });
    let items = response.data.items ||[];

    // get only parcels that are operating
    let parcels = items.filter(item => item.status === 'Operating');

    // map api item to useful object
    let results = parcels.map(item => {
      let dist = item.distance ? (item.distance / 1000) : null;
      if (!dist && lat && lon) {
        dist = calculateDistance(lat, lon, item.location.latitude, item.location.longitude);
      }

      return {
        id: item.name, 
        address: `${item.address.line1}, ${item.address_details.city}`,
        description: item.location_description || 'Parcel Locker',
        imageUrl: item.image_url,
        distance: dist ? parseFloat(dist).toFixed(2) : null
      };
    });

    // sort by distance
    if (lat && lon) {
      results.sort((a, b) => a.distance - b.distance);
    }

    // return top 10
    return c.json(results.slice(0, 10));

  } catch (error) {
    console.error('Proxy Error:', error.message);
    return c.json({ message: 'Error fetching data from external API' }, 500);
  }
});

export default app;