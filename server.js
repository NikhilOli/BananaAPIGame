const express = require('express');
const fetch = require('node-fetch'); // node-fetch v2
const cors = require('cors');

const app = express();
app.use(cors()); // allow all origins (dev).

const BANANA_BASE = 'http://marcconrad.com/uob/banana/api.php';

// Proxy endpoint: /banana?out=json&base64=yes
app.get('/banana', async (req, res) => {
  try {
    // forward query string
    const qs = new URLSearchParams(req.query).toString();
    const url = `${BANANA_BASE}${qs ? '?' + qs : ''}`;

    const resp = await fetch(url, { method: 'GET' });
    const contentType = resp.headers.get('content-type') || 'application/json';

    // If the response is JSON, parse and send JSON
    if (contentType.includes('application/json') || contentType.includes('text/json')) {
      const json = await resp.json();
      res.set('Content-Type', 'application/json');
      return res.status(200).json(json);
    }

    // Otherwise stream raw body (e.g., if server returns plain text)
    const text = await resp.text();
    res.set('Content-Type', contentType);
    res.status(resp.status).send(text);

  } catch (err) {
    console.error('Proxy error', err);
    res.status(500).json({ error: 'Proxy error', details: String(err) });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Banana proxy listening on http://localhost:${PORT}`));
