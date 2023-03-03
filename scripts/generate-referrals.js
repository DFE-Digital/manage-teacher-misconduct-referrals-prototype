const fs = require('fs')
const path = require('path')
const faker =  require('@faker-js/faker').faker
faker.setLocale('en_GB');
const _ = require('lodash');
const jobTitles = [
  'Headteacher',
  'Teacher',
  'Teaching assistant'
]

const schoolNames = [
  'Azgard Secondary School',
  'Sakaar School',
  'Ragnarok School',
  'Ultron College',
  'Thanos Primary School',
]

const generateReferral = (params = {}) => {
  const userType = params.type || faker.helpers.arrayElement([
    'Employer',
    'Public'
  ])


  let referral = {}

  referral.type = userType

  // Meta
  referral.id = params.id || ('' + faker.datatype.number({min: 123456, max: 999999}))
  referral.referralDate = params.referralDate || faker.date.past()

  // Referrer
  referral.referrer = _.get(params, 'referrer') || {}
  referral.referrer.firstName = _.get(params, 'referrer.firstName') || faker.name.firstName()
  referral.referrer.lastName = _.get(params, 'referrer.lastName') || faker.name.lastName()
  referral.referrer.emailAddress = _.get(params, 'referrer.emailAddress') || `${referral.referrer.firstName.toLowerCase()}.${referral.referrer.lastName.toLowerCase()}@gmail.com`
  referral.referrer.phoneNumber = _.get(params, 'referrer.phoneNumber') || faker.phone.number('079## ### ###')

  if(userType == 'Employer') {
    referral.referrer.jobTitle = _.get(params, 'referrer.jobTitle') || faker.helpers.arrayElement(jobTitles)
  }

  // Organisation
  if(userType == 'Employer') {
    referral.referrer.organisation = _.get(params, 'referrer.organisation') || {}
    referral.referrer.organisation.name = _.get(params, 'referrer.organisation.name') || faker.helpers.arrayElement(schoolNames)
    referral.referrer.organisation.address = _.get(params, 'referrer.organisation.address') || {
      line1: '1 The Avenue',
      town: 'London',
      postcode: 'W9 1ST'
    }
  }

  // Teacher
  referral.teacher = _.get(params, 'teacher') || {}
  referral.teacher.firstName = _.get(params, 'teacher.firstName') || faker.name.firstName()
  referral.teacher.lastName = _.get(params, 'teacher.lastName') || faker.name.lastName()
  referral.teacher.hasAnotherName = _.get(params, 'teacher.hasAnotherName') || faker.helpers.arrayElement([
    'Yes',
    'No'
  ])
  if(referral.teacher.hasAnotherName == 'Yes') {
    referral.teacher.otherName = _.get(params, 'teacher.otherName') || 'Bobsky'
  }

  if(userType == 'Employer') {
    referral.teacher.hasDateOfBirth = _.get(params, 'teacher.hasDateOfBirth') || faker.helpers.arrayElement([
      'Yes',
      'No'
    ])
    if(referral.teacher.hasDateOfBirth == 'Yes') {
      referral.teacher.dateOfBirth = _.get(params, 'teacher.dateOfBirth') || faker.date.past(25)
    }

    referral.teacher.hasNationalInsuranceNumber = _.get(params, 'teacher.hasNationalInsuranceNumber') || faker.helpers.arrayElement([
      'Yes',
      'No'
    ])
    if(referral.teacher.hasNationalInsuranceNumber == 'Yes') {
      referral.teacher.nationalInsuranceNumber = _.get(params, 'teacher.nationalInsuranceNumber') || 'QQ 12 34 56 C'
    }
    referral.teacher.hasTeacherReferenceNumber = _.get(params, 'teacher.hasTeacherReferenceNumber') || faker.helpers.arrayElement([
      'Yes',
      'No'
    ])
    if(referral.teacher.hasTeacherReferenceNumber == 'Yes') {
      referral.teacher.trn = _.get(params, 'teacher.trn') || '4567814'
    }
    referral.teacher.hasQTS = _.get(params, 'teacher.hasQTS') || faker.helpers.arrayElement([
      'Yes',
      'No',
      'I’m not sure'
    ])
  }

  // Teacher contact details
  if(userType == 'Employer') {
    referral.teacher.hasEmailAddress = _.get(params, 'teacher.hasEmailAddress') || faker.helpers.arrayElement([
      'Yes',
      'No'
    ])
    if(referral.teacher.hasEmailAddress == 'Yes') {
      referral.teacher.emailAddress = _.get(params, 'teacher.emailAddress') || `${referral.teacher.firstName.toLowerCase()}.${referral.teacher.lastName.toLowerCase()}@gmail.com`
    }
    referral.teacher.hasPhoneNumber = _.get(params, 'teacher.hasPhoneNumber') || faker.helpers.arrayElement([
      'Yes',
      'No'
    ])
    if(referral.teacher.hasPhoneNumber == 'Yes') {
      referral.teacher.phoneNumber = _.get(params, 'teacher.phoneNumber') || faker.phone.number('079## ### ###')
    }

    referral.teacher.hasAddress = _.get(params, 'teacher.hasAddress') || faker.helpers.arrayElement([
      'Yes',
      'No'
    ])

    if(referral.teacher.hasAddress == 'Yes') {
      referral.teacher.address = _.get(params, 'referrer.teacher.address') || {
        line1: '1 The Walk',
        town: 'Manchester',
        postcode: 'M1 1AG'
      }
    }
  }

  // About their role
  referral.teacher.jobTitle = _.get(params, 'teacher.jobTitle') || faker.helpers.arrayElement(jobTitles)

  referral.teacher.roleDescriptionMethod = _.get(params, 'teacher.roleDescriptionMethod') || faker.helpers.arrayElement([
    'Upload file',
    'Describe the work carried out'
  ])

  if(referral.teacher.roleDescriptionMethod == 'Upload file') {
    referral.teacher.roleDescriptionFile = _.get(params, 'teacher.roleDescriptionFile') || {
      name: 'job-description.pdf',
      size: '1MB'
    }
  }
  if(referral.teacher.roleDescriptionMethod == 'Describe the work carried out') {
    referral.teacher.roleDescription = _.get(params, 'teacher.roleDescription') || faker.lorem.paragraphs(2, '\n\n')
  }


  if(userType == 'Employer') {
    referral.teacher.workedAtSameOrganisation = _.get(params, 'teacher.workedAtSameOrganisation') || faker.helpers.arrayElement([
      'Yes',
      'No'
    ])

    if(referral.teacher.workedAtSameOrganisation == 'No') {

      referral.teacher.knowWhereTheyWorked = _.get(params, 'teacher.knowWhereTheyWorked') || faker.helpers.arrayElement([
        'Yes',
        'No'
      ])

      if(referral.teacher.knowWhereTheyWorked == 'Yes') {
        referral.teacher.organisation = _.get(params, 'teacher.organisation') || {}
        referral.teacher.organisation.name = _.get(params, 'teacher.organisation.name') || faker.helpers.arrayElement(schoolNames)
        referral.teacher.organisation.address = _.get(params, 'teacher.organisation.address') || {
          line1: '1 The Avenue',
          town: 'London',
          postcode: 'W9 1ST'
        }
      }
    }

    referral.teacher.hasJobStartDate = _.get(params, 'teacher.hasJobStartDate') || faker.helpers.arrayElement([
      'Yes',
      'No'
    ])
    if(referral.teacher.hasJobStartDate == 'Yes') {
      referral.teacher.jobStartDate = _.get(params, 'teacher.jobStartDate') || faker.date.past()
    }

    referral.teacher.areTheyStillEmployed = _.get(params, 'teacher.areTheyStillEmployed') || faker.helpers.arrayElement([
      'Yes',
      'They’re still employed but they’ve been suspended',
      'No'
    ])

    if(referral.teacher.areTheyStillEmployed == 'No') {

      referral.teacher.knowWhenTheyLeftJob = _.get(params, 'teacher.knowWhenTheyLeftJob') || faker.helpers.arrayElement([
        'Yes',
        'No'
      ])

      if(referral.teacher.knowWhenTheyLeftJob == 'Yes') {
        referral.teacher.jobEndDate = _.get(params, 'teacher.jobEndDate') || faker.date.past()
      }

      referral.teacher.jobEndReason = _.get(params, 'teacher.jobEndReason') || faker.helpers.arrayElement([
        'Resigned',
        'Dismissed',
        'Retired',
        'I’m not sure'
      ])
    }

    referral.teacher.isWorkingSomewhereElse = _.get(params, 'teacher.isWorkingSomewhereElse') || faker.helpers.arrayElement([
      'Yes',
      'No',
      'I’m not sure'
    ])

    if(referral.teacher.isWorkingSomewhereElse == 'Yes') {

      referral.teacher.knowWhereTheyWork = _.get(params, 'teacher.knowWhereTheyWork') || faker.helpers.arrayElement([
        'Yes',
        'No'
      ])

      if(referral.teacher.knowWhereTheyWork == 'Yes') {
        referral.teacher.newOrganisation = _.get(params, 'teacher.newOrganisation') || {}
        referral.teacher.newOrganisation.name = _.get(params, 'teacher.newOrganisation.name') || faker.helpers.arrayElement(schoolNames)
        referral.teacher.newOrganisation.address = _.get(params, 'teacher.newOrganisation.address') || {
          line1: '1 The Avenue',
          town: 'Manchester',
          postcode: 'M1 2PK'
        }
      }
    }
  }

  if(userType == 'Public') {
    referral.teacher.knowWhereTheyWorked = _.get(params, 'teacher.knowWhereTheyWorked') || faker.helpers.arrayElement([
      'Yes',
      'No'
    ])

    if(referral.teacher.knowWhereTheyWorked == 'Yes') {
      referral.teacher.organisation = _.get(params, 'teacher.organisation') || {}
      referral.teacher.organisation.name = _.get(params, 'teacher.organisation.name') || faker.helpers.arrayElement(schoolNames)
      referral.teacher.organisation.address = _.get(params, 'teacher.organisation.address') || {
        line1: '1 The Avenue',
        town: 'London',
        postcode: 'W9 1ST'
      }
    }
  }

  // Allegation
  referral.allegation = _.get(params, 'allegation') || {}

  referral.allegation.method = _.get(params, 'allegation.method') || faker.helpers.arrayElement([
    'Upload file',
    'Describe the allegation'
  ])
  if(referral.allegation.method == 'Upload file') {
    referral.allegation.file = _.get(params, 'allegation.file') || {
      name: 'allegation-details.pdf',
      size: '2MB'
    }
  }
  if(referral.allegation.method == 'Describe the allegation') {
    referral.allegation.description = _.get(params, 'allegation.description') || faker.lorem.paragraphs(3, '\n\n')
  }
  if(userType == 'Employer') {
    referral.allegation.hasToldDBS = _.get(params, 'allegation.hasToldDBS') || faker.helpers.arrayElement([
      'Yes, I’ve told DBS',
      'No'
    ])
  }
  if(userType == 'Public') {
    referral.allegation.howComplaintHasBeenDealtWith = _.get(params, 'allegation.howComplaintHasBeenDealtWith') || faker.lorem.paragraphs(2, '\n\n')
  }

  // Previous allegations
  if(userType == 'Employer') {
    referral.previousAllegations = _.get(params, 'previousAllegations') || {}
    referral.previousAllegations.hasPreviousAllegations = _.get(params, 'previousAllegations.hasPreviousAllegations') || faker.helpers.arrayElement([
      'Yes',
      'No',
      'I’m not sure'
    ])
    if(referral.previousAllegations.hasPreviousAllegations == 'Yes') {
      referral.previousAllegations.method = _.get(params, 'allegation.method') || faker.helpers.arrayElement([
        'Upload file',
        'Describe the previous allegations'
      ])
      if(referral.previousAllegations.method == 'Upload file') {
        referral.previousAllegations.file = _.get(params, 'previousAllegations.file') || {
          name: 'previous-misconduct-details.pdf',
          size: '2MB'
        }
      }
      if(referral.previousAllegations.method == 'Describe the previous allegations') {
        referral.previousAllegations.description = _.get(params, 'previousAllegations.description') || faker.lorem.paragraphs(3, '\n\n')
      }
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
      name: 'main.pdf',
      size: '1MB',
      description: 'Main investigation'
    }, {
      name: 'polic-xyz.pdf',
      size: '3MB',
      description: 'Police investigation'
    }, {
      name: 'statements.pdf',
      size: '2MB',
      description: 'Signed witness statements'
    }]
  }

  return referral
}

const generateReferrals = () => {
  const referrals = []

  referrals.push(generateReferral({
    type: 'Employer',
    referralDate: faker.date.recent(),
    teacher: {
      firstName: 'Tony',
      lastName: 'Stark',
      workedAtSameOrganisation: 'No',
      knowWhereTheyWorked: 'Yes',
      organisation: {
        name: 'Boom School',
        address: {
          line1: '1 The Avenue',
          town: 'London',
          postcode: 'W9 1ST'
        }
      },
      hasJobStartDate: 'Yes',
      jobStartDate: faker.date.past(),
      areTheyStillEmployed: 'No',
      knowWhenTheyLeftJob: 'Yes',
      jobEndDate: faker.date.past(),
      jobEndReason: 'Dismissed',
      isWorkingSomewhereElse: 'Yes',
      knowWhereTheyWork: 'Yes',
      newOrganisation: {
        name: 'Modern Art Plc',
        address: {
          line1: '1 The Avenue',
          town: 'Manchester',
          postcode: 'M1 2PK'
        }
      }
    },
    evidence: {
      hasEvidence: 'Yes'
    }
  }))


  referrals.push(generateReferral({
    type: 'Public',
    evidence: {
      hasEvidence: 'Yes'
    }
  }))
  referrals.push(generateReferral({
    type: 'Employer',
    evidence: {
      hasEvidence: 'Yes'
    }
  }))
  referrals.push(generateReferral({
    type: 'Public',
    evidence: {
      hasEvidence: 'Yes'
    }
  }))

  for(let i = 0; i < 21; i++) {
    referrals.push(generateReferral())
  }

  return referrals
}

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
