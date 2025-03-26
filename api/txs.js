export default async function handler(req, res) {
  const { address, before = '', page_size = 40 } = req.query;

  if (!address) {
    return res.status(400).json({ error: 'Address required' });
  }

  const url = `https://api.eclipsescan.xyz/v1/account/transaction?address=${address}&page_size=${page_size}${before ? `&before=${before}` : ''}`;

  try {
    const response = await fetch(url, {
      headers: {
        'accept': 'application/json, text/plain, */*'
      }
    });

    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch from Eclipse API', details: e.message });
  }
}
