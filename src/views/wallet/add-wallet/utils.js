const tabsList = [
  {
    title: 'Account Details',
    icon: 'feather icon-file-text',
    form: [
      {
        label: 'Username',
        labelFor: 'i-username',
        type: 'input',
      },
      {
        label: 'Email',
        labelFor: 'i-email',
        type: 'input',
      },
      {
        label: 'Password',
        labelFor: 'i-password',
        type: 'input',
      },
      {
        label: 'Confirm Password',
        labelFor: 'i-c-password',
        type: 'input',
      },
    ],
  },
  {
    title: 'Personal Info',
    icon: 'feather icon-user',
    form: [
      {
        label: 'First Name',
        labelFor: 'i-first-name',
        type: 'input',
      },
      {
        label: 'Last Name',
        labelFor: 'i-last-name',
        type: 'input',
      },
      {
        label: 'Country',
        labelFor: 'i-country',
        type: 'select',
        model: 'selectedContry',
        options: 'countryName',
      },
      {
        label: 'Country',
        labelFor: 'i-country',
        type: 'select',
        model: 'selectedLanguage',
        options: 'languageName',
      },
    ],
  }, {
    title: 'Address',
    icon: 'feather icon-map-pin',
    form: [
      {
        label: 'Address',
        labelFor: 'i-address',
        type: 'input',
      },
      {
        label: 'Landmark',
        labelFor: 'i-landmark',
        type: 'input',
      },
      {
        label: 'Pincode',
        labelFor: 'i-pincode',
        type: 'input',
      },
      {
        label: 'City',
        labelFor: 'i-city',
        type: 'input',
      },
    ],
  }, {
    title: 'Social Links',
    icon: 'feather icon-link',
    form: [
      {
        label: 'Twitter',
        labelFor: 'i-twitter',
        type: 'input',
      },
      {
        label: 'Facebook',
        labelFor: 'i-facebook',
        type: 'input',
      },
      {
        label: 'Google+',
        labelFor: 'i-google-plus',
        type: 'input',
      },
      {
        label: 'LinkedIn',
        labelFor: 'i-linked-in',
        type: 'input',
      },
    ],
  },
]

export default tabsList
