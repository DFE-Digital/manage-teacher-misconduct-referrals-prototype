const fs = require('fs')
const path = require('path')
const faker =  require('@faker-js/faker').faker
faker.setLocale('en_GB');
const _ = require('lodash');

const generateReferral = (params = {}) => {
  let referral = {}

  // meta
  referral.id = params.id || ('' + faker.datatype.number({min: 123456, max: 999999}))
  referral.submissionDate = params.submissionDate || faker.date.past()

  // Referrer
  referral.referrer = _.get(params, 'referrer') || {}
  referral.referrer.name = _.get(params, 'referrer.name') || faker.name.firstName() + ' ' + faker.name.lastName()
  referral.referrer.jobTitle = _.get(params, 'referrer.jobTitle') || faker.helpers.arrayElement(['Headteacher', 'Teacher', 'Teaching assistant'])
  referral.referrer.phoneNumber = _.get(params, 'referrer.phoneNumber') || faker.phone.number('079## ### ###')

  // Organisation
  referral.referrer.organisation = _.get(params, 'referrer.organisation') || {}
  referral.referrer.organisation.name = _.get(params, 'referrer.organisation.name') || faker.company.name() + ' School'
  referral.referrer.organisation.address = _.get(params, 'referrer.organisation.address') || {
    line1: '1 The Avenue',
    town: 'London',
    postcode: 'W9 1ST'
  }

  // Teacher
  referral.teacher = _.get(params, 'teacher') || {}
  referral.teacher.firstName = _.get(params, 'teacher.firstName') || faker.name.firstName()
  referral.teacher.lastName = _.get(params, 'teacher.lastName') || faker.name.lastName()
  referral.teacher.hasAnotherName = _.get(params, 'teacher.hasAnotherName') || faker.helpers.arrayElement(['Yes', 'No', 'I do not know'])
  if(referral.teacher.hasAnotherName == 'Yes') {
    referral.teacher.otherName = _.get(params, 'teacher.otherName') || 'Bobsky'
  }
  referral.teacher.dateOfBirth = _.get(params, 'teacher.dateOfBirth') || faker.date.past()
  referral.teacher.hasNationalInsuranceNumber = _.get(params, 'teacher.hasNationalInsuranceNumber') || faker.helpers.arrayElement(['Yes', 'No'])
  if(referral.teacher.hasNationalInsuranceNumber == 'Yes') {
    referral.teacher.nationalInsuranceNumber = _.get(params, 'teacher.nationalInsuranceNumber') || 'QQ 12 34 56 C'
  }
  referral.teacher.hasTeacherReferenceNumber = _.get(params, 'teacher.hasTeacherReferenceNumber') || faker.helpers.arrayElement(['Yes', 'No'])
  if(referral.teacher.hasTeacherReferenceNumber == 'Yes') {
    referral.teacher.trn = _.get(params, 'teacher.trn') || '4567814'
  }
  referral.teacher.hasQTS = _.get(params, 'teacher.hasQTS') || faker.helpers.arrayElement(['Yes', 'No', 'I do not know'])
  referral.teacher.hasEmailAddress = _.get(params, 'teacher.hasEmailAddress') || faker.helpers.arrayElement(['Yes', 'No'])
  if(referral.teacher.hasEmailAddress == 'Yes') {
    referral.teacher.emailAddress = _.get(params, 'teacher.emailAddress') || `${referral.teacher.firstName.toLowerCase()}.${referral.teacher.lastName.toLowerCase()}@gmail.com`
  }
  referral.teacher.hasPhoneNumber = _.get(params, 'teacher.hasPhoneNumber') || faker.helpers.arrayElement(['Yes', 'No'])
  if(referral.teacher.hasPhoneNumber == 'Yes') {
    referral.teacher.phoneNumber = _.get(params, 'teacher.phoneNumber') || faker.phone.number('079## ### ###')
  }
  referral.teacher.address = _.get(params, 'referrer.teacher.address') || {
    line1: '1 The Walk',
    town: 'Manchester',
    postcode: 'M1 1AG'
  }
  referral.teacher.hasJobStartDate = _.get(params, 'teacher.hasJobStartDate') || faker.helpers.arrayElement(['Yes', 'No'])
  if(referral.teacher.hasJobStartDate == 'Yes') {
    referral.teacher.jobStartDate = _.get(params, 'teacher.jobStartDate') || faker.date.past()
  }
  referral.teacher.areTheyStillEmployed = _.get(params, 'teacher.areTheyStillEmployed') || faker.helpers.arrayElement(['Yes', 'They’re still employed but they’ve been suspended', 'No, they’ve left the organisation'])
  if(referral.teacher.areTheyStillEmployed == 'No, they’ve left the organisation') {
    referral.teacher.jobEndDate = _.get(params, 'teacher.jobEndDate') || faker.date.past()
    referral.teacher.jobEndReason = _.get(params, 'teacher.jobEndReason') || faker.helpers.arrayElement(['Resigned', 'Dismissed', 'Retired', 'I do not know'])
  }
  referral.teacher.jobTitle = _.get(params, 'teacher.jobTitle') || faker.helpers.arrayElement(['Headteacher', 'Teacher', 'Teaching assistant'])
  referral.teacher.doesWorkAtSameOrganisation = _.get(params, 'teacher.doesWorkAtSameOrganisation') || faker.helpers.arrayElement(['Yes', 'No'])
  if(referral.teacher.doesWorkAtSameOrganisation == 'No') {
    referral.teacher.organisation = _.get(params, 'teacher.organisation') || {}
    referral.teacher.organisation.name = _.get(params, 'teacher.organisation.name') || faker.company.name() + ' School'
    referral.teacher.organisation.address = _.get(params, 'teacher.organisation.address') || {
      line1: '1 The Avenue',
      town: 'London',
      postcode: 'W9 1ST'
    }
  }
  referral.teacher.roleDescriptionMethod = _.get(params, 'teacher.roleDescriptionMethod') || faker.helpers.arrayElement([
    'I’ll upload a job description',
    'I’ll describe their main duties',
    'I’ll do this later'
  ])
  if(referral.teacher.roleDescriptionMethod == 'I’ll upload a job description') {
    referral.teacher.roleDescriptionFile = _.get(params, 'teacher.roleDescriptionFile') || {
      name: 'job-description.pdf',
      size: '1MB'
    }
  }
  if(referral.teacher.descriptionMethod == 'I’ll describe their main duties') {
    referral.teacher.roleDescription = _.get(params, 'teacher.roleDescription') || faker.lorem.paragraphs(3, '\n\n')
  }
  referral.teacher.isTeachingSomewhereElse = _.get(params, 'teacher.isTeachingSomewhereElse') || faker.helpers.arrayElement([
    'Yes, they’re teaching somewhere else',
    'No, they’re not teaching somewhere else',
    'I do not know'
  ])
  if(referral.teacher.isTeachingSomewhereElse == 'Yes, they’re teaching somewhere else') {
    referral.teacher.newOrganisation = _.get(params, 'teacher.newOrganisation') || {}
    referral.teacher.newOrganisation.name = _.get(params, 'teacher.newOrganisation.name') || faker.company.name() + ' School'
    referral.teacher.newOrganisation.address = _.get(params, 'teacher.newOrganisation.address') || {
      line1: '1 The Avenue',
      town: 'Manchester',
      postcode: 'M1 2PK'
    }
  }

  // allegation
  referral.allegation = _.get(params, 'allegation') || {}
  referral.allegation.method = _.get(params, 'allegation.method') || faker.helpers.arrayElement([
    'I’ll upload the allegation details',
    'I’ll give details of the allegation',
    'I’ll do this later'
  ])
  if(referral.allegation.method == 'I’ll upload the allegation details') {
    referral.allegation.file = _.get(params, 'allegation.file') || {
      name: 'allegation-details.pdf',
      size: '2MB'
    }
  }
  if(referral.allegation.method == 'I’ll give details of the allegation') {
    referral.allegation.description = _.get(params, 'allegation.description') || faker.lorem.paragraphs(3, '\n\n')
  }
  referral.allegation.hasToldDBS = _.get(params, 'allegation.hasToldDBS') || faker.helpers.arrayElement(['Yes, I’ve told DBS', 'No'])

  // Previous allegations
  referral.previousAllegations = _.get(params, 'previousAllegations') || {}
  referral.previousAllegations.hasPreviousAllegations = _.get(params, 'previousAllegations.hasPreviousAllegations') || faker.helpers.arrayElement([
    'Yes',
    'No',
    'I do not know'
  ])
  if(referral.previousAllegations.hasPreviousAllegations == 'Yes') {
    referral.previousAllegations.method = _.get(params, 'allegation.method') || faker.helpers.arrayElement([
      'I’ll upload the previous misconduct details',
      'I’ll give details of the previous misconduct',
      'I’ll do this later'
    ])
    if(referral.previousAllegations.method == 'I’ll upload the previous misconduct details') {
      referral.previousAllegations.file = _.get(params, 'previousAllegations.file') || {
        name: 'previous-misconduct-details.pdf',
        size: '2MB'
      }
    }
    if(referral.previousAllegations.method == 'I’ll give details of the previous misconduct') {
      referral.previousAllegations.description = _.get(params, 'previousAllegations.description') || faker.lorem.paragraphs(3, '\n\n')
    }
  }

  // Evidence
  referral.evidence = _.get(params, 'evidence') || {}
  referral.evidence.hasEvidence = _.get(params, 'evidence.hasEvidence') || faker.helpers.arrayElement([
    'Yes',
    'No'
  ])
  if(referral.evidence.hasEvidence == 'Yes') {
    referral.evidence.files = [{
      name: 'main-investigation.pdf',
      size: '1MB',
      category: 'Documents of internal investigations and outcomes'
    }, {
      name: 'police-investigation.pdf',
      size: '3MB',
      category: 'Police investigations and reports'
    }, {
      name: 'signed-withness-statements.pdf',
      size: '2MB',
      category: 'Signed witness statements'
    }, {
      name: 'cctv-footage.mp4',
      size: '2MB',
      category: 'File notes concerning conduct, behaviour and attitude'
    }]
  }

  return referral
}

const generateReferrals = () => {
  const referrals = []

  for(let i = 0; i < 25; i++) {
    referrals.push(generateReferral())
  }

  return referrals
}

/**
 * Generate JSON file
 *
 * @param {String} filePath Location of generated file
 *
 */
const generateReferralsFile = (filePath) => {
  const referrals = generateReferrals()
  const filedata = JSON.stringify(referrals, null, 2)
  fs.writeFile(
    filePath,
    filedata,
    (error) => {
      if (error) {
        console.error(error)
      }
      console.log(`Referrals generated: ${filePath}`)
    }
  )
}

generateReferralsFile(path.join(__dirname, '../app/data/referrals.json'))
