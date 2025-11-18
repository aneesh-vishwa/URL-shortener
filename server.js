const shortid = require('shortid');
const Url = require('./models/URL');
const cors = require('cors');

app.use(cors());

// helper
const getBaseUrl = (req) => {
  if (process.env.BASE_URL) return process.env.BASE_URL;
  return `${req.protocol}://${req.get('host')}`;
};

app.post('/api/short', async (req, res) => {
  try {
    const { longUrl } = req.body;

    if (!longUrl || typeof longUrl !== 'string') {
      return res.status(400).json({ error: 'Please provide a valid URL' });
    }

    const baseUrl = getBaseUrl(req);

    let url = await Url.findOne({ longUrl });
    if (url) {
      return res.json(url);
    }

    const urlCode = shortid.generate();
    const shortUrl = `${baseUrl}/${urlCode}`;

    url = new Url({ urlCode, longUrl, shortUrl });
    await url.save();

    res.status(201).json(url);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});
