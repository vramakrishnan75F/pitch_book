export type CreateOrderResponse = {
  orderId: string
  amount: number
  currency: string
}

export async function createOrder(
  apiBaseUrl: string,
  amount: number,
): Promise<Response> {
  return fetch(`${apiBaseUrl}/api/payment/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount }),
  })
}
