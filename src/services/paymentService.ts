import { createOrder, type CreateOrderResponse } from '../repositories/paymentRepository'

export async function requestPaymentOrder(
  apiBaseUrl: string,
  amount: number,
): Promise<{ response: Response; payloadText: string; payload?: CreateOrderResponse }> {
  const response = await createOrder(apiBaseUrl, amount)
  const payloadText = await response.clone().text()

  if (!response.ok) {
    return { response, payloadText }
  }

  const payload = (await response.json()) as CreateOrderResponse
  return { response, payloadText, payload }
}
