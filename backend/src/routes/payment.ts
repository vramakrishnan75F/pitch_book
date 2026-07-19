import { Router } from 'express'
import Razorpay from 'razorpay'

const router = Router()

router.post('/create-order', async (req, res) => {
  try {
    const amount = Number(req.body?.amount)

    if (!Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({ error: 'Valid amount is required.' })
    }

    const keyId = process.env.RAZORPAY_KEY_ID
    const keySecret = process.env.RAZORPAY_KEY_SECRET

    if (!keyId || !keySecret) {
      return res.status(500).json({ error: 'Razorpay keys are not configured.' })
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    })

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: 'INR',
    })

    return res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create order.'
    return res.status(500).json({ error: message })
  }
})

export default router
