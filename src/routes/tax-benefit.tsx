import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tax-benefit')({
  component: TaxBenefitPage,
})

function TaxBenefitPage() {
  return (
    <div>
      {/* Header */}
      <section
        className="py-20 px-6 text-center"
        style={{
          background: 'linear-gradient(160deg, #8B0000 0%, #4A0E00 50%, #2D1B00 100%)',
          borderBottom: '3px solid #D4A017',
        }}
      >
        <div className="text-4xl mb-3" style={{ color: '#D4A017' }}>📜</div>
        <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{ color: '#FFFFFF', fontFamily: 'Georgia, serif' }}>
          80G Tax Benefit
        </h1>
        <p className="text-lg" style={{ color: '#C4A882', fontFamily: 'Georgia, serif' }}>
          Your donation brings blessings — and tax savings
        </p>
      </section>

      {/* Hero Callout */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-2xl p-10 text-center"
            style={{
              background: 'linear-gradient(135deg, #FFF8F0, #F5E6D3)',
              border: '3px solid #D4A017',
              boxShadow: '0 20px 60px rgba(139,0,0,0.15)',
            }}
          >
            <div className="text-6xl mb-4">🇮🇳</div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#8B0000', fontFamily: 'Georgia, serif' }}>
              Donations are Tax Exempt under Section 80G
            </h2>
            <p className="text-base leading-relaxed" style={{ color: '#5C3D11' }}>
              Beteswar Jhareswar Shiva Mandir is a registered charitable trust recognized by the Income Tax Department of India. Donations made to the temple qualify for income tax deductions under <strong>Section 80G of the Income Tax Act, 1961</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* What is 80G */}
      <section className="py-16 px-6" style={{ background: '#F5E6D3' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10" style={{ color: '#8B0000', fontFamily: 'Georgia, serif' }}>
            What is Section 80G?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              className="p-8 rounded-2xl"
              style={{ background: '#fff', border: '1px solid #E8D5B0' }}
            >
              <div className="text-3xl mb-4">📘</div>
              <h3 className="font-bold text-xl mb-3" style={{ color: '#8B0000', fontFamily: 'Georgia, serif' }}>
                Legal Definition
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#5C3D11' }}>
                Section 80G of the Income Tax Act, 1961 allows individuals and companies to claim deductions on donations made to specified charitable funds and institutions. This incentive by the Government of India encourages citizens to contribute to social and religious causes.
              </p>
            </div>

            <div
              className="p-8 rounded-2xl"
              style={{ background: '#fff', border: '1px solid #E8D5B0' }}
            >
              <div className="text-3xl mb-4">💰</div>
              <h3 className="font-bold text-xl mb-3" style={{ color: '#8B0000', fontFamily: 'Georgia, serif' }}>
                How Much Can You Save?
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#5C3D11' }}>
                Donations to Beteswar Jhareswar Shiva Mandir are eligible for a <strong>50% deduction</strong> of the donated amount from your total taxable income. For example, if you donate ₹10,000, you can claim a deduction of ₹5,000 from your taxable income.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10" style={{ color: '#8B0000', fontFamily: 'Georgia, serif' }}>
            How to Claim 80G Benefits
          </h2>

          <div className="space-y-6">
            {[
              {
                step: '01',
                title: 'Make a Donation',
                desc: 'Donate by cash (up to ₹2,000 eligible), cheque, demand draft, UPI, or bank transfer to Beteswar Jhareswar Shiva Mandir.',
              },
              {
                step: '02',
                title: 'Collect Your Receipt',
                desc: 'Obtain an official donation receipt from the temple. The receipt will contain the temple\'s name, PAN number, 80G registration number, and your donation details.',
              },
              {
                step: '03',
                title: 'File Your ITR',
                desc: 'While filing your Income Tax Return (ITR), enter the donation details under Section 80G. Attach the receipt as supporting documentation.',
              },
              {
                step: '04',
                title: 'Claim the Deduction',
                desc: 'Claim 50% of your donated amount as a deduction from your gross total income. The deduction reduces your taxable income and therefore your tax liability.',
              },
            ].map((step) => (
              <div
                key={step.step}
                className="flex gap-6 p-6 rounded-xl"
                style={{ background: '#fff', border: '1px solid #E8D5B0', boxShadow: '0 4px 16px rgba(139,0,0,0.06)' }}
              >
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg"
                  style={{ background: 'linear-gradient(135deg, #8B0000, #D4A017)', color: '#fff', fontFamily: 'Georgia, serif' }}
                >
                  {step.step}
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2" style={{ color: '#8B0000', fontFamily: 'Georgia, serif' }}>
                    {step.title}
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: '#5C3D11' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Details */}
      <section className="py-16 px-6" style={{ background: '#F5E6D3' }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10" style={{ color: '#8B0000', fontFamily: 'Georgia, serif' }}>
            Important Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🏦', title: 'PAN Required', desc: 'Provide your PAN number at the time of donation for amounts over ₹2,000 to ensure your receipt is ITR-compliant.' },
              { icon: '📋', title: 'Trust PAN', desc: 'The temple\'s PAN and 80G registration number will be printed on every official receipt. Verify details with our office.' },
              { icon: '💳', title: 'Payment Modes', desc: 'Cash (up to ₹2,000), cheque, DD, NEFT, RTGS, UPI — all modes accepted. Digital payments preferred for easy tracking.' },
              { icon: '📅', title: 'Financial Year', desc: 'Claim the deduction in the same financial year in which the donation is made. Receipts are dated accordingly.' },
              { icon: '📊', title: 'Qualifying Limit', desc: 'The deduction under 80G may be subject to a qualifying limit (10% of Adjusted Gross Total Income for some funds).' },
              { icon: '📞', title: 'Need Help?', desc: 'Our office will guide you through the process. Contact us for any clarification regarding 80G receipts or donation procedures.' },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-xl"
                style={{ background: '#fff', border: '1px solid #E8D5B0' }}
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h4 className="font-bold text-base mb-2" style={{ color: '#8B0000', fontFamily: 'Georgia, serif' }}>
                  {item.title}
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: '#5C3D11' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Ways */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10" style={{ color: '#8B0000', fontFamily: 'Georgia, serif' }}>
            How to Donate
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              className="p-8 rounded-2xl"
              style={{ background: 'linear-gradient(135deg, #8B0000, #4A0E00)', border: '2px solid #D4A017' }}
            >
              <h3 className="font-bold text-xl mb-4" style={{ color: '#F0C040', fontFamily: 'Georgia, serif' }}>
                🏛️ Bank Transfer / Cheque
              </h3>
              <div className="space-y-2 text-sm" style={{ color: '#E8D5B0' }}>
                <div><span style={{ color: '#D4A017' }}>Account Name:</span> Beteswar Jhareswar Shiva Mandir Trust</div>
                <div><span style={{ color: '#D4A017' }}>Bank:</span> [Bank Name]</div>
                <div><span style={{ color: '#D4A017' }}>Branch:</span> [Branch Name]</div>
                <div><span style={{ color: '#D4A017' }}>Account No.:</span> [Account Number]</div>
                <div><span style={{ color: '#D4A017' }}>IFSC Code:</span> [IFSC Code]</div>
              </div>
            </div>

            <div
              className="p-8 rounded-2xl"
              style={{ background: 'linear-gradient(135deg, #4A0E00, #2D1B00)', border: '2px solid #D4A017' }}
            >
              <h3 className="font-bold text-xl mb-4" style={{ color: '#F0C040', fontFamily: 'Georgia, serif' }}>
                📱 UPI / Online Payment
              </h3>
              <div className="space-y-3 text-sm" style={{ color: '#E8D5B0' }}>
                <p>Scan the QR code or use our UPI ID to donate instantly through any UPI app (GPay, PhonePe, Paytm, etc.)</p>
                <div
                  className="w-32 h-32 mx-auto rounded-xl flex items-center justify-center"
                  style={{ background: '#fff' }}
                >
                  <div className="text-center">
                    <div className="text-4xl">📱</div>
                    <div className="text-xs" style={{ color: '#8B0000' }}>UPI QR Code</div>
                  </div>
                </div>
                <div className="text-center"><span style={{ color: '#D4A017' }}>UPI ID:</span> beteswarshiva@upi</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 px-6" style={{ background: '#F5E6D3' }}>
        <div className="max-w-4xl mx-auto">
          <div
            className="p-6 rounded-xl text-sm"
            style={{ background: '#fff', border: '1px solid #E8D5B0', color: '#5C3D11' }}
          >
            <strong style={{ color: '#8B0000' }}>Disclaimer:</strong> The information provided above is for general guidance only. Tax laws are subject to change. Please consult a qualified Chartered Accountant or Tax Advisor to understand the exact tax benefit applicable to your individual situation. Beteswar Jhareswar Shiva Mandir is not responsible for any tax-related decisions made solely on the basis of the information on this page.
          </div>
        </div>
      </section>
    </div>
  )
}
