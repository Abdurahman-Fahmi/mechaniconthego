app.post('/api/initiate-payment', async (req, res) => {
    const { amount, currency, paymentType } = req.body;

    const entityId = '8ac7a4c98b95d588018b9e5216970417'; // Replace with your HyperPay Entity ID
    const authorizationKey = 'OGFjN2E0Yzk4Yjk1ZDU4ODAxOGI5ZTUwNTZlMjA0MTF8YVROS0Z4Szc3Y1JSZzRjRw=='; // Replace with your HyperPay Authorization Key
    const baseUrl = 'https://test.oppwa.com'; // Use "https://oppwa.com" for live payments

    try {
        const response = await axios.post(
            `${baseUrl}/v1/checkouts`,
            new URLSearchParams({
                'entityId': entityId,
                'amount': amount.toString(),
                'currency': IQD,
                'paymentType': DB, // e.g., 'DB' for debit
            }),
            {
                headers: {
                    Authorization: `Bearer ${authorizationKey}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        res.json({
            checkoutId: response.data.id,
            redirectUrl: `${baseUrl}/v1/paymentWidgets.js?checkoutId=${response.data.id}`,
        });
    } catch (error) {
        res.status(500).json({ error: error.response?.data || error.message });
    }
});
