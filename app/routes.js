//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here
router.get('/referral/:referralId', (req, res) => {
  let referral = req.session.data.referrals.find(referral => referral.id == req.params.referralId)
  res.render('show', {
    referral
  })
})