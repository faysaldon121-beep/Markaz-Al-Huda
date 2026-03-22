import { NextRequest, NextResponse } from 'next/server';

const WEB3FORMS_KEY = process.env.WEB3FORMS_KEY!;
const ADMIN_EMAIL = 'Arishere93@gmail.com';

async function sendEmail(subject: string, to: string, message: string) {
  await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      subject,
      to,
      message,
      from_name: 'Markaz ul Huda Website',
    }),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { studentName, studentEmail, courseTitle, paymentMethod, transactionId, amount } = body;

    const methodLabels: Record<string, string> = {
      jazzcash: 'JazzCash (0348-6596339)',
      easypaisa: 'EasyPaisa (0347-6535805)',
      payfast: 'PayFast (Card)',
      bank: 'Bank Transfer (IBAN)',
    };

    // Email to admin
    await sendEmail(
      `💳 New Enrollment: ${studentName} — ${courseTitle}`,
      ADMIN_EMAIL,
      `New course enrollment received:

Student: ${studentName}
Email: ${studentEmail}
Course: ${courseTitle}
Amount: PKR ${Number(amount).toLocaleString()}
Payment Method: ${methodLabels[paymentMethod] || paymentMethod}
Transaction ID: ${transactionId}

ACTION REQUIRED: Verify this payment in your ${methodLabels[paymentMethod] || paymentMethod} account using the Transaction ID above, then grant the student course access.`
    );

    // Confirmation to student
    await sendEmail(
      `Enrollment Received — ${courseTitle}`,
      studentEmail,
      `As-salamu alaykum ${studentName},

We received your enrollment for ${courseTitle}.

Summary:
- Course: ${courseTitle}
- Amount: PKR ${Number(amount).toLocaleString()}
- Payment Method: ${methodLabels[paymentMethod] || paymentMethod}
- Transaction ID: ${transactionId}

Our team will verify your payment and grant you access within 24 hours.

For queries: +92 344 1722419 or Arishere93@gmail.com

JazakAllah Khair,
Markaz ul Huda, Kot Abdullah, Qasoor`
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Enroll error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
