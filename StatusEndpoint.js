app.get('/api/payment-status/:checkoutId', async (req, res) => {
    const { checkoutId } = req.params;

    const entityId = '8ac7a4c98b95d588018b9e5216970417';
    const authorizationKey = 'OGFjN2E0Yzk4Yjk1ZDU4ODAxOGI5ZTUwNTZlMjA0MTF8YVROS0Z4Szc3Y1JSZzRjRw==';
    const baseUrl = 'https://test.oppwa.com';

    try {
        const response = await axios.get(
            `${baseUrl}/v1/checkouts/${checkoutId}/payment`,
            {
                params: { entityId: entityId },
                headers: {
                    Authorization: `Bearer ${authorizationKey}`,
                },
            }
        );

        res.json({ paymentStatus: response.data.result.description });
    } catch (error) {
        res.status(500).json({ error: error.response?.data || error.message });
    }
});
