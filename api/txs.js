export default async function handler(req, res) {
  const { address, before = '', page_size = 40 } = req.query;

  if (!address) {
    return res.status(400).json({ error: 'Missing address' });
  }

  const url = `https://api.eclipsescan.xyz/v1/account/transaction?address=${address}&page_size=${page_size}${before ? `&before=${before}` : ''}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'accept': 'application/json, text/plain, */*',
        'origin': 'https://eclipsescan.xyz',
        'referer': 'https://eclipsescan.xyz/',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
        // ✅ 替换这里为你抓包中的 sol-aut 值（仅 sol-aut 就够用）
        'cookie': 'sol-aut=rWurgsLRnYPO-QZ=eg-JZphwn3GWOAdq'
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch', status: response.status });
    }

    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server Error', details: err.message });
  }
}
