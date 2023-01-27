//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.post('/account/sign-in', (req, res) => {
  req.session.data.user = {}
  res.redirect('/referrals')
})

router.get('/account/sign-out', (req, res) => {
  req.session.data.user = null
  res.redirect('/')
})

router.get('/referrals', (req, res) => {
  let referrals = req.session.data.referrals.sort((a, b) => {
    return new Date(b.referralDate) - new Date(a.referralDate);
  })
  res.render('referrals/index', {
    referrals
  })
})

router.get('/referral/:referralId', (req, res) => {
  let referral = req.session.data.referrals.find(referral => referral.id == req.params.referralId)
  res.render('referrals/show', {
    referral
  })
})