//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const flash = require('connect-flash')
router.use(flash())

router.all('*', (req, res, next) => {
  res.locals.flash = req.flash('success')
  next()
})

router.get('/', (req, res) => {
  if(!req.session.data.user) {
    res.redirect('/account/sign-in')
  } else {
    res.redirect('/referrals')
  }
})

router.post('/account/sign-in', (req, res) => {
  req.session.data.user = {}
  res.redirect('/referrals')
})

router.get('/account/sign-out', (req, res) => {
  req.session.data.user = null
  res.redirect('/')
})

router.post('/account/password/reset', (req, res) => {
  res.redirect('/account/password/reset/confirmation')
})

router.post('/account/password/edit', (req, res) => {
  req.flash('success', 'Password updated')
  req.session.data.user = {}
  res.redirect('/referrals')
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