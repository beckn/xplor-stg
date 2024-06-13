export function scholarshipStatusResponse(transaction_id: string) {
  return {
    context: {
      domain: 'onest:financial-support',
      location: {
        city: {
          name: 'Bangalore',
          code: 'std:080',
        },
        country: {
          name: 'India',
          code: 'IND',
        },
      },
      action: 'on_status',
      version: '0.7.0',
      bap_id: 'ps-bap-network.becknprotocol.io',
      bap_uri: 'https://ps-bap-network.becknprotocol.io/',
      bpp_id: 'beckn-sandbox-bpp.becknprotocol.io',
      bpp_uri: 'https://sandbox-bpp-network.becknprotocol.io/',
      transaction_id: transaction_id,
      message_id: 'a9aaecca-10b7-4d19-b640-b047a7c60009',
      timestamp: '2023-02-06T09:55:41.161Z',
      ttl: 'PT10M',
    },
    message: {
      order: {
        id: '12424kh',
        provider: {
          id: '471',
          descriptor: {
            name: 'XYZ Education Foundation',
            short_desc: 'Short Description about the Foundation',
            images: [
              {
                url: 'url of the image of the provider',
              },
            ],
          },
          rateable: false,
        },
        items: [
          {
            id: 'SCM_63587501',
            descriptor: {
              name: 'XYZ Education Scholarship for Undergraduate Students',
              long_desc: 'XYZ Education Scholarship for Undergraduate Students',
            },
            price: {
              currency: 'INR',
              value: 'Upto RS.1000 per year',
            },
            time: {
              label: 'Start  & End date of the Application',
              range: {
                start: '2022-09-01T00:00:00.000Z',
                end: '2022-10-31T00:00:00.000Z',
              },
            },
            rateable: false,
            tags: [
              {
                display: true,
                descriptor: {
                  code: 'soc-elg',
                  name: 'Social Eligibility',
                },
                list: [
                  {
                    value: 'SC',
                  },
                  {
                    value: 'ST',
                  },
                  {
                    value: 'OBC',
                  },
                ],
              },
              {
                display: true,
                descriptor: {
                  code: 'gen-elg',
                  name: 'Gender Eligibility',
                },
                list: [
                  {
                    value: 'Female',
                  },
                  {
                    value: 'Transgender',
                  },
                ],
              },
              {
                display: true,
                descriptor: {
                  code: 'fin-elg',
                  name: 'Financial Eligibility',
                },
                list: [
                  {
                    value: 'Max Family Income - Rs.500000.00',
                  },
                ],
              },
              {
                display: true,
                descriptor: {
                  code: 'acad-elg',
                  name: 'Academic Eligibility',
                },
                list: [
                  {
                    descriptor: {
                      code: 'class',
                      name: 'Class',
                    },
                    value: '12th',
                  },
                  {
                    descriptor: {
                      code: 'percentage',
                      name: 'Percentage',
                    },
                    value: '>= 50',
                  },
                ],
              },
              {
                display: true,
                descriptor: {
                  code: 'docs-reqd',
                  name: 'Documents Required',
                },
                list: [
                  {
                    value: '10th Marksheet',
                  },
                  {
                    value: 'Aadhar Card of the Student',
                  },
                  {
                    value: 'Aadhar Card of the Parent',
                  },
                  {
                    value: 'Pan Card of the Parent',
                  },
                ],
              },
              {
                display: true,
                descriptor: {
                  code: 'add-info',
                  name: 'Additional Information',
                },
                list: [
                  {
                    descriptor: {
                      code: 'faq-url',
                      name: "Frequently Asked Questions's URL",
                    },
                    value: 'https://www.xyz-scholarship.com/faq',
                  },
                  {
                    descriptor: {
                      code: 'tnc-url',
                      name: "Terms and Conditions's URL",
                    },
                    value: 'https://www.xyz-scholarship.com/tnc',
                  },
                ],
              },
            ],
            location_ids: ['L1', 'L2'],
            fulfillment_ids: ['VSP_FUL_1113'],
          },
        ],
        billing: {
          name: 'Manjunath',
          organization: {
            descriptor: {
              name: 'Namma Yatri',
              code: 'nammayatri.in',
            },
            contact: {
              phone: '+91-8888888888',
              email: 'scholarships@nammayatri.in',
            },
          },
          address: 'No 27, XYZ Lane, etc',
          phone: '+91-9999999999',
        },
        fulfillments: [
          {
            state: {
              descriptor: {
                code: 'SCHOLARSHIP-APPROVED',
                name: 'Application Submitted',
              },
              updated_at: '2023-02-06T09:55:41.161Z',
            },
            id: 'VSP_FUL_1113',
            type: 'SCHOLARSHIP',
            tracking: false,
            agent: {
              person: {
                name: 'Ekstep Foundation SPoc',
              },
              contact: {
                email: 'ekstepsupport@ekstep.com',
              },
            },
            customer: {
              id: 'aadhaar:798677675565',
              person: {
                name: 'Jane Doe',
                age: '13',
                gender: 'female',
              },
              contact: {
                phone: '+91-9663088848',
                email: 'jane.doe@example.com',
              },
            },
          },
        ],
        cancellation_terms: [
          {
            cancellation_fee: {
              amount: {
                currency: 'INR',
                value: 'Penalty upto 5,00,000 INR',
              },
            },
          },
        ],
        docs: [
          {
            descriptor: {
              name: 'Application Details',
              short_desc:
                'To open this document, enter the password sent to your email mayan****@***.com',
            },
            url: 'https://link-to-the-document.com',
            mime_type: 'application/pdf',
          },
        ],
        payments: [
          {
            params: {
              bank_code: 'IFSC_Code_Of_the_bank',
              bank_account_number: '121212121212',
              bank_account_name: 'Account Holder Name',
            },
          },
        ],
        quote: {
          price: {
            currency: 'INR',
            value: '250000',
          },
          breakup: [
            {
              title: 'Tution fee',
              price: {
                currency: 'INR',
                value: '150000',
              },
            },
            {
              title: 'Hostel fee',
              price: {
                currency: 'INR',
                value: '50000',
              },
            },
            {
              title: 'Books',
              price: {
                currency: 'INR',
                value: '50000',
              },
            },
          ],
        },
      },
    },
  };
}

export function scholarshipSelectResponse(transaction_id: string) {
  return {
    context: {
      domain: 'onest:financial-support',
      location: {
        city: {
          name: 'Bangalore',
          code: 'std:080',
        },
        country: {
          name: 'India',
          code: 'IND',
        },
      },
      action: 'on_select',
      timestamp: '2023-08-02T09:12:12.680Z',
      ttl: 'PT10M',
      version: '0.7.0',
      bap_id: 'ps-bap-network.becknprotocol.io',
      bap_uri: 'https://ps-bap-network.becknprotocol.io/',
      bpp_id: 'beckn-sandbox-bpp.becknprotocol.io',
      bpp_uri: 'https://sandbox-bpp-network.becknprotocol.io/',
      transaction_id: transaction_id,
      message_id: '6114a3e5-acb0-4c99-b017-0ead5e894bad',
    },
    message: {
      order: {
        provider: {
          id: 'BX213573733',
          descriptor: {
            name: 'XYZ Education Foundation',
            short_desc: 'Short Description about the Foundation',
            images: [
              {
                url: 'url of the image of the provider',
              },
            ],
          },
          locations: [
            {
              id: 'L1',
              city: 'Pune',
              state: 'Maharastra',
            },
            {
              id: 'L2',
              city: 'Thane',
              state: 'Maharastra',
            },
            {
              id: 'L3',
              city: 'Lucknow',
              state: 'Uttar Pradesh',
            },
          ],
          rateable: false,
        },
        items: [
          {
            id: 'SCM_63587501',
            descriptor: {
              name: 'XYZ Education Scholarship for Undergraduate Students',
              short_desc:
                'XYZ Education Scholarship for Undergraduate Students',
            },
            price: {
              currency: 'INR',
              value: 'Upto RS.1000 per year',
            },
            time: {
              label: 'Start  & End date of the Application',
              range: {
                start: '2022-09-01T00:00:00.000Z',
                end: '2022-10-31T00:00:00.000Z',
              },
            },
            rateable: false,
            tags: [
              {
                display: true,
                descriptor: {
                  code: 'soc-elg',
                  name: 'Social Eligibility',
                },
                list: [
                  {
                    value: 'SC',
                  },
                  {
                    value: 'ST',
                  },
                  {
                    value: 'OBC',
                  },
                ],
              },
              {
                display: true,
                descriptor: {
                  code: 'gen-elg',
                  name: 'Gender Eligibility',
                },
                list: [
                  {
                    value: 'Female',
                  },
                  {
                    value: 'Transgender',
                  },
                ],
              },
              {
                display: true,
                descriptor: {
                  code: 'fin-elg',
                  name: 'Financial Eligibility',
                },
                list: [
                  {
                    value: 'Max Family Income - Rs.500000.00',
                  },
                ],
              },
              {
                display: true,
                descriptor: {
                  code: 'acad-elg',
                  name: 'Academic Eligibility',
                },
                list: [
                  {
                    descriptor: {
                      code: 'class',
                      name: 'Class',
                    },
                    value: '12th',
                  },
                  {
                    descriptor: {
                      code: 'percentage',
                      name: 'Percentage',
                    },
                    value: '>= 50',
                  },
                ],
              },
              {
                display: true,
                descriptor: {
                  code: 'docs-reqd',
                  name: 'Documents Required',
                },
                list: [
                  {
                    value: '10th Marksheet',
                  },
                  {
                    value: 'Aadhar Card of the Student',
                  },
                  {
                    value: 'Aadhar Card of the Parent',
                  },
                  {
                    value: 'Pan Card of the Parent',
                  },
                ],
              },
              {
                display: true,
                descriptor: {
                  code: 'add-info',
                  name: 'Additional Information',
                },
                list: [
                  {
                    descriptor: {
                      code: 'faq-url',
                      name: "Frequently Asked Questions's URL",
                    },
                    value: 'https://www.xyz-scholarship.com/faq',
                  },
                  {
                    descriptor: {
                      code: 'tnc-url',
                      name: "Terms and Conditions's URL",
                    },
                    value: 'https://www.xyz-scholarship.com/tnc',
                  },
                ],
              },
            ],
            location_ids: ['L1', 'L2'],
            category_ids: ['DSEP_CAT_1'],
          },
        ],
        fulfillments: [
          {
            id: 'DSEP_FUL_63587501',
            type: 'SCHOLARSHIP',
            tracking: false,
            agent: {
              person: {
                name: 'Ekstep Foundation SPoc',
              },
              contact: {
                email: 'ekstepsupport@ekstep.com',
              },
            },
          },
        ],
        quote: {
          price: {
            currency: 'INR',
            value: '250000',
          },
          breakup: [
            {
              title: 'Tution fee',
              price: {
                currency: 'INR',
                value: '150000',
              },
            },
            {
              title: 'Hostel fee',
              price: {
                currency: 'INR',
                value: '50000',
              },
            },
            {
              title: 'Books',
              price: {
                currency: 'INR',
                value: '50000',
              },
            },
          ],
        },
      },
    },
  };
}

export function scholarshipInitResponse(transaction_id: string) {
  return {
    context: {
      domain: 'onest:financial-support',
      location: {
        city: {
          name: 'Bangalore',
          code: 'std:080',
        },
        country: {
          name: 'India',
          code: 'IND',
        },
      },
      action: 'on_init',
      version: '0.7.0',
      bap_id: 'ps-bap-network.becknprotocol.io',
      bap_uri: 'https://ps-bap-network.becknprotocol.io/',
      bpp_id: 'beckn-sandbox-bpp.becknprotocol.io',
      bpp_uri: 'https://sandbox-bpp-network.becknprotocol.io/',
      transaction_id: transaction_id,
      message_id: 'a9aaecca-10b7-4d19-b640-b047a7c60009',
      timestamp: '2023-02-06T09:55:41.161Z',
      ttl: 'PT10M',
    },
    message: {
      order: {
        provider: {
          id: '471',
          descriptor: {
            name: 'XYZ Education Foundation',
            short_desc: 'Short Description about the Foundation',
            images: [
              {
                url: 'url of the image of the provider',
              },
            ],
          },
          rateable: false,
        },
        items: [
          {
            id: 'SCM_63587501',
            descriptor: {
              name: 'XYZ Education Scholarship for Undergraduate Students',
              long_desc: 'XYZ Education Scholarship for Undergraduate Students',
            },
            price: {
              currency: 'INR',
              value: 'Upto RS.1000 per year',
            },
            time: {
              label: 'Start  & End date of the Application',
              range: {
                start: '2022-09-01T00:00:00.000Z',
                end: '2022-10-31T00:00:00.000Z',
              },
            },
            xinput: {
              required: true,
              head: {
                descriptor: {
                  name: 'Application Form',
                },
                index: {
                  min: 0,
                  cur: 0,
                  max: 3,
                },
                headings: [
                  'Personal Details',
                  'Educational Details',
                  'Financial Information',
                  'Review & Submit',
                ],
              },
              form: {
                mime_type: 'text/html',
                url: 'https://implementation-layer-dev.thewitslab.com/applicationForm',
                resubmit: false,
                auth: {
                  descriptor: {
                    code: 'jwt',
                  },
                  value:
                    'eyJhbGciOiJIUzI.eyJzdWIiOiIxMjM0NTY3O.SflKxwRJSMeKKF2QT4',
                },
              },
            },
            rateable: false,
            tags: [
              {
                display: true,
                descriptor: {
                  code: 'soc-elg',
                  name: 'Social Eligibility',
                },
                list: [
                  {
                    value: 'SC',
                  },
                  {
                    value: 'ST',
                  },
                  {
                    value: 'OBC',
                  },
                ],
              },
              {
                display: true,
                descriptor: {
                  code: 'gen-elg',
                  name: 'Gender Eligibility',
                },
                list: [
                  {
                    value: 'Female',
                  },
                  {
                    value: 'Transgender',
                  },
                ],
              },
              {
                display: true,
                descriptor: {
                  code: 'fin-elg',
                  name: 'Financial Eligibility',
                },
                list: [
                  {
                    value: 'Max Family Income - Rs.500000.00',
                  },
                ],
              },
              {
                display: true,
                descriptor: {
                  code: 'acad-elg',
                  name: 'Academic Eligibility',
                },
                list: [
                  {
                    descriptor: {
                      code: 'class',
                      name: 'Class',
                    },
                    value: '12th',
                  },
                  {
                    descriptor: {
                      code: 'percentage',
                      name: 'Percentage',
                    },
                    value: '>= 50',
                  },
                ],
              },
              {
                display: true,
                descriptor: {
                  code: 'docs-reqd',
                  name: 'Documents Required',
                },
                list: [
                  {
                    value: '10th Marksheet',
                  },
                  {
                    value: 'Aadhar Card of the Student',
                  },
                  {
                    value: 'Aadhar Card of the Parent',
                  },
                  {
                    value: 'Pan Card of the Parent',
                  },
                ],
              },
              {
                display: true,
                descriptor: {
                  code: 'add-info',
                  name: 'Additional Information',
                },
                list: [
                  {
                    descriptor: {
                      code: 'faq-url',
                      name: "Frequently Asked Questions's URL",
                    },
                    value: 'https://www.xyz-scholarship.com/faq',
                  },
                  {
                    descriptor: {
                      code: 'tnc-url',
                      name: "Terms and Conditions's URL",
                    },
                    value: 'https://www.xyz-scholarship.com/tnc',
                  },
                ],
              },
            ],
            location_ids: ['L1', 'L2'],
            fulfillment_ids: ['VSP_FUL_1113'],
          },
        ],
        billing: {
          name: 'Manjunath',
          organization: {
            descriptor: {
              name: 'Namma Yatri',
              code: 'nammayatri.in',
            },
            contact: {
              phone: '+91-8888888888',
              email: 'scholarships@nammayatri.in',
            },
          },
          address: 'No 27, XYZ Lane, etc',
          phone: '+91-9999999999',
        },
        fulfillments: [
          {
            state: {
              descriptor: {
                code: 'APPLICATION-STARTED',
                name: 'Application started',
              },
              updated_at: '2023-02-06T09:55:41.161Z',
            },
            id: 'VSP_FUL_1113',
            type: 'SCHOLARSHIP',
            tracking: false,
            agent: {
              person: {
                name: 'Ekstep Foundation SPoc',
              },
              contact: {
                email: 'ekstepsupport@ekstep.com',
              },
            },
            customer: {
              id: 'aadhaar:798677675565',
              person: {
                name: 'Jane Doe',
                age: '13',
                gender: 'female',
              },
              contact: {
                phone: '+91-9663088848',
                email: 'jane.doe@example.com',
              },
            },
          },
        ],
        payments: [
          {
            params: {
              bank_code: 'IFSC_Code_Of_the_bank',
              bank_account_number: '121212121212',
              bank_account_name: 'Account Holder Name',
            },
          },
        ],
        quote: {
          price: {
            currency: 'INR',
            value: '250000',
          },
          breakup: [
            {
              title: 'Tution fee',
              price: {
                currency: 'INR',
                value: '150000',
              },
            },
            {
              title: 'Hostel fee',
              price: {
                currency: 'INR',
                value: '50000',
              },
            },
            {
              title: 'Books',
              price: {
                currency: 'INR',
                value: '50000',
              },
            },
          ],
        },
      },
    },
  };
}

export function scholarshipConfirmResponse(transaction_id: string) {
  return {
    context: {
      domain: 'onest:financial-support',
      location: {
        city: {
          name: 'Bangalore',
          code: 'std:080',
        },
        country: {
          name: 'India',
          code: 'IND',
        },
      },
      action: 'on_confirm',
      version: '0.7.0',
      bap_id: 'ps-bap-network.becknprotocol.io',
      bap_uri: 'https://ps-bap-network.becknprotocol.io/',
      bpp_id: 'beckn-sandbox-bpp.becknprotocol.io',
      bpp_uri: 'https://sandbox-bpp-network.becknprotocol.io/',
      transaction_id: transaction_id,
      message_id: 'a9aaecca-10b7-4d19-b640-b047a7c60009',
      timestamp: '2023-02-06T09:55:41.161Z',
      ttl: 'PT10M',
    },
    message: {
      order: {
        id: '12424kh',
        provider: {
          id: '471',
          descriptor: {
            name: 'XYZ Education Foundation',
            short_desc: 'Short Description about the Foundation',
            images: [
              {
                url: 'url of the image of the provider',
              },
            ],
          },
          rateable: false,
        },
        items: [
          {
            id: 'SCM_63587501',
            descriptor: {
              name: 'XYZ Education Scholarship for Undergraduate Students',
              long_desc: 'XYZ Education Scholarship for Undergraduate Students',
            },
            price: {
              currency: 'INR',
              value: 'Upto RS.1000 per year',
            },
            time: {
              label: 'Start  & End date of the Application',
              range: {
                start: '2022-09-01T00:00:00.000Z',
                end: '2022-10-31T00:00:00.000Z',
              },
            },
            rateable: false,
            tags: [
              {
                display: true,
                descriptor: {
                  code: 'soc-elg',
                  name: 'Social Eligibility',
                },
                list: [
                  {
                    value: 'SC',
                  },
                  {
                    value: 'ST',
                  },
                  {
                    value: 'OBC',
                  },
                ],
              },
              {
                display: true,
                descriptor: {
                  code: 'gen-elg',
                  name: 'Gender Eligibility',
                },
                list: [
                  {
                    value: 'Female',
                  },
                  {
                    value: 'Transgender',
                  },
                ],
              },
              {
                display: true,
                descriptor: {
                  code: 'fin-elg',
                  name: 'Financial Eligibility',
                },
                list: [
                  {
                    value: 'Max Family Income - Rs.500000.00',
                  },
                ],
              },
              {
                display: true,
                descriptor: {
                  code: 'acad-elg',
                  name: 'Academic Eligibility',
                },
                list: [
                  {
                    descriptor: {
                      code: 'class',
                      name: 'Class',
                    },
                    value: '12th',
                  },
                  {
                    descriptor: {
                      code: 'percentage',
                      name: 'Percentage',
                    },
                    value: '>= 50',
                  },
                ],
              },
              {
                display: true,
                descriptor: {
                  code: 'docs-reqd',
                  name: 'Documents Required',
                },
                list: [
                  {
                    value: '10th Marksheet',
                  },
                  {
                    value: 'Aadhar Card of the Student',
                  },
                  {
                    value: 'Aadhar Card of the Parent',
                  },
                  {
                    value: 'Pan Card of the Parent',
                  },
                ],
              },
              {
                display: true,
                descriptor: {
                  code: 'add-info',
                  name: 'Additional Information',
                },
                list: [
                  {
                    descriptor: {
                      code: 'faq-url',
                      name: "Frequently Asked Questions's URL",
                    },
                    value: 'https://www.xyz-scholarship.com/faq',
                  },
                  {
                    descriptor: {
                      code: 'tnc-url',
                      name: "Terms and Conditions's URL",
                    },
                    value: 'https://www.xyz-scholarship.com/tnc',
                  },
                ],
              },
            ],
            location_ids: ['L1', 'L2'],
            fulfillment_ids: ['VSP_FUL_1113'],
          },
        ],
        billing: {
          name: 'Manjunath',
          organization: {
            descriptor: {
              name: 'Namma Yatri',
              code: 'nammayatri.in',
            },
            contact: {
              phone: '+91-8888888888',
              email: 'scholarships@nammayatri.in',
            },
          },
          address: 'No 27, XYZ Lane, etc',
          phone: '+91-9999999999',
        },
        fulfillments: [
          {
            state: {
              descriptor: {
                code: 'APPLICATION-SUBMITTED',
                name: 'Application Submitted',
              },
              updated_at: '2023-02-06T09:55:41.161Z',
            },
            id: 'VSP_FUL_1113',
            type: 'SCHOLARSHIP',
            tracking: false,
            agent: {
              person: {
                name: 'Ekstep Foundation SPoc',
              },
              contact: {
                email: 'ekstepsupport@ekstep.com',
              },
            },
            customer: {
              id: 'aadhaar:798677675565',
              person: {
                name: 'Jane Doe',
                age: '13',
                gender: 'female',
              },
              contact: {
                phone: '+91-9663088848',
                email: 'jane.doe@example.com',
              },
            },
          },
        ],
        cancellation_terms: [
          {
            cancellation_fee: {
              amount: {
                currency: 'INR',
                value: 'Penalty upto 5,00,000 INR',
              },
            },
          },
        ],
        docs: [
          {
            descriptor: {
              name: 'Application Details',
              short_desc:
                'To open this document, enter the password sent to your email mayan****@***.com',
            },
            url: 'https://link-to-the-document.com',
            mime_type: 'application/pdf',
          },
        ],
        payments: [
          {
            params: {
              bank_code: 'IFSC_Code_Of_the_bank',
              bank_account_number: '121212121212',
              bank_account_name: 'Account Holder Name',
            },
          },
        ],
        quote: {
          price: {
            currency: 'INR',
            value: '250000',
          },
          breakup: [
            {
              title: 'Tution fee',
              price: {
                currency: 'INR',
                value: '150000',
              },
            },
            {
              title: 'Hostel fee',
              price: {
                currency: 'INR',
                value: '50000',
              },
            },
            {
              title: 'Books',
              price: {
                currency: 'INR',
                value: '50000',
              },
            },
          ],
        },
      },
    },
  };
}
export function courseInitResponse(transaction_id: string) {
  return {
    context: {
      domain: 'onest:learning-experiences',
      version: '1.1.0',
      action: 'on_init',
      bap_uri: 'https://sample.bap.io/',
      bap_id: 'sample.bap.io',
      bpp_id: 'infosys.springboard.io',
      bpp_uri: 'https://infosys.springboard.io',
      transaction_id: transaction_id,
      message_id: 'd514a38f-e112-4bb8-a3d8-b8e5d8dea82d',
      ttl: 'PT10M',
      timestamp: '2023-02-20T15:21:36.925Z',
    },
    message: {
      order: {
        provider: {
          id: 'INFOSYS',
          descriptor: {
            name: 'Infosys Springboard',
            short_desc: 'Infosys Springboard Digital literacy program',
            images: [
              {
                url: 'https://infyspringboard.onwingspan.com/web/assets/images/infosysheadstart/app_logos/landing-new.png',
                size_type: 'sm',
              },
            ],
          },
          categories: [
            {
              id: 'LANGUAGE-COURSES',
              descriptor: {
                code: 'LANGUAGE-COURSES',
                name: 'Language Courses',
              },
            },
            {
              id: 'SKILL-DEVELOPMENT-COURSES',
              descriptor: {
                code: 'SKILL-DEVELOPMENT-COURSES',
                name: 'Skill development Courses',
              },
            },
            {
              id: 'TECHNICAL-COURSES',
              descriptor: {
                code: 'TECHNICAL-COURSES',
                name: 'Technical Courses',
              },
            },
            {
              id: 'SELF-PACED-COURSES',
              descriptor: {
                code: 'SELF-PACED-COURSES',
                name: 'Self Paced Courses',
              },
            },
          ],
        },
        items: [
          {
            id: 'd4975df5-b18c-4772-80ad-368669856d52',
            quantity: {
              maximum: {
                count: 1,
              },
            },
            descriptor: {
              name: 'Everyday Conversational English',
              short_desc:
                "Elevate your daily conversations with confidence through our 'Everyday Conversational English' course.",
              long_desc:
                "<p><strong>Course Overview:</strong><br>Welcome to 'Everyday Conversational English,' your key to mastering essential language skills for real-life communication. Tailored for all levels, this course offers:</p><ol><li><strong>Practical Vocabulary:</strong><br>Learn everyday expressions for seamless communication.</li><li><strong>Interactive Role-Playing:</strong><br>Apply knowledge through immersive exercises for real-world scenarios.</li><li><strong>Cultural Insights:</strong><br>Gain cultural nuances to connect authentically in conversations.</li><li><strong>Real-Life Scenarios:</strong><br>Navigate common situations with confidence-building tools.</li><li><strong>Quiz Assessments:</strong><br>Reinforce learning through quizzes for ongoing skill development.</li></ol><p><strong>Why Take This Course:</strong></p><ul><li><strong>Personal & Professional Growth:</strong><br>Enhance personal connections and gain a professional edge.</li><li><strong>Cultural Fluency:</strong><br>Understand and engage with diverse cultures confidently.</li><li><strong>Life-Long Skill:</strong><br>Develop a valuable skill applicable across various life stages.</li></ul><p>Join 'Everyday Conversational English' and elevate your communication for meaningful connections and success.</p>",
              images: [
                {
                  url: 'https://infyspringboard.onwingspan.com/web/assets/images/infosysheadstart/everyday-conversational-english.png',
                },
              ],
              media: [
                {
                  url: 'https://implementation-layer-dev.thewitslab.com/applicationForm',
                },
              ],
            },
            creator: {
              descriptor: {
                name: 'Prof. Emma Sullivan',
                short_desc:
                  'Experienced language educator dedicated to fostering practical conversational skills and cultural fluency',
                long_desc:
                  "Hello, I'm Prof. Emma Sullivan, your guide in 'Everyday Conversational English.' With over a decade of experience, I'm here to make language learning dynamic and culturally enriching. Let's explore practical communication skills together for personal and professional growth. Join me on this exciting journey!",
                images: [
                  {
                    url: 'https://infyspringboard.onwingspan.com/web/assets/images/infosysheadstart/ins/1.png',
                  },
                ],
              },
            },
            price: {
              currency: 'INR',
              value: '150',
            },
            category_ids: ['LANGUAGE-COURSES', 'SELF-PACED-COURSES'],
            rating: '4.5',
            rateable: true,
            tags: [
              {
                descriptor: {
                  code: 'content-metadata',
                  name: 'Content metadata',
                },
                list: [
                  {
                    descriptor: {
                      code: 'learner-level',
                      name: 'Learner level',
                    },
                    value: 'Beginner',
                  },
                  {
                    descriptor: {
                      code: 'learning-objective',
                      name: 'Learning objective',
                    },
                    value:
                      'By the end of the course, learners will confidently navigate everyday conversations, demonstrating improved fluency, cultural awareness, and effective communication skills.',
                  },
                  {
                    descriptor: {
                      code: 'prerequisite',
                      name: 'Prerequisite',
                    },
                    value: 'Should have a basic understanding of English',
                  },
                  {
                    descriptor: {
                      code: 'prerequisite',
                      name: 'Prerequisite',
                    },
                    value:
                      'Access to a computer or internet to access the course online',
                  },
                  {
                    descriptor: {
                      code: 'lang-code',
                      name: 'Language code',
                    },
                    value: 'en',
                  },
                  {
                    descriptor: {
                      code: 'course-duration',
                      name: 'Course duration',
                    },
                    value: 'P20H',
                  },
                ],
                display: true,
              },
            ],
          },
        ],
        fulfillments: [
          {
            agent: {
              person: {
                name: 'Infosys Springboard',
              },
              contact: {
                email: 'support@infy.com',
              },
            },
            customer: {
              person: {
                name: 'Jane Doe',
                age: '13',
                gender: 'female',
                tags: [
                  {
                    descriptor: {
                      code: 'professional-details',
                      name: 'Professional Details',
                    },
                    list: [
                      {
                        descriptor: {
                          code: 'profession',
                          name: 'profession',
                        },
                        value: 'student',
                      },
                    ],
                    display: true,
                  },
                ],
              },
              contact: {
                phone: '+91-9663088848',
                email: 'jane.doe@example.com',
              },
            },
          },
        ],
        quote: {
          price: {
            currency: 'INR',
            value: '150',
          },
        },
        billing: {
          name: 'Jane Doe',
          phone: '+91-9663088848',
          email: 'jane.doe@example.com',
          address: 'No 27, XYZ Lane, etc',
        },
        payments: [
          {
            params: {
              amount: '150',
              currency: 'INR',
            },
            url: 'https://examplepayments.com/pay',
            type: 'PRE-ORDER',
            status: 'PAID',
            collected_by: 'bpp',
          },
        ],
      },
    },
  };
}

export function courseSelectResponse(transaction_id: string) {
  return {
    context: {
      domain: 'onest:learning-experiences',
      version: '1.1.0',
      action: 'on_select',
      bap_uri: 'https://sample.bap.io/',
      bap_id: 'sample.bap.io',
      bpp_id: 'infosys.springboard.io',
      bpp_uri: 'https://infosys.springboard.io',
      transaction_id: transaction_id,
      message_id: 'd514a38f-e112-4bb8-a3d8-b8e5d8dea82d',
      ttl: 'PT10M',
      timestamp: '2023-02-20T15:21:36.925Z',
    },
    message: {
      order: {
        provider: {
          id: 'INFOSYS',
          descriptor: {
            name: 'Infosys Springboard',
            short_desc: 'Infosys Springboard Digital literacy program',
            images: [
              {
                url: 'https://infyspringboard.onwingspan.com/web/assets/images/infosysheadstart/app_logos/landing-new.png',
                size_type: 'sm',
              },
            ],
          },
          categories: [
            {
              id: 'LANGUAGE-COURSES',
              descriptor: {
                code: 'LANGUAGE-COURSES',
                name: 'Language Courses',
              },
            },
            {
              id: 'SKILL-DEVELOPMENT-COURSES',
              descriptor: {
                code: 'SKILL-DEVELOPMENT-COURSES',
                name: 'Skill development Courses',
              },
            },
            {
              id: 'TECHNICAL-COURSES',
              descriptor: {
                code: 'TECHNICAL-COURSES',
                name: 'Technical Courses',
              },
            },
            {
              id: 'SELF-PACED-COURSES',
              descriptor: {
                code: 'SELF-PACED-COURSES',
                name: 'Self Paced Courses',
              },
            },
          ],
        },
        items: [
          {
            id: 'd4975df5-b18c-4772-80ad-368669856d52',
            quantity: {
              maximum: 1,
            },
            descriptor: {
              name: 'Everyday Conversational English',
              short_desc:
                "Elevate your daily conversations with confidence through our 'Everyday Conversational English' course.",
              long_desc:
                "<p><strong>Course Overview:</strong><br>Welcome to 'Everyday Conversational English,' your key to mastering essential language skills for real-life communication. Tailored for all levels, this course offers:</p><ol><li><strong>Practical Vocabulary:</strong><br>Learn everyday expressions for seamless communication.</li><li><strong>Interactive Role-Playing:</strong><br>Apply knowledge through immersive exercises for real-world scenarios.</li><li><strong>Cultural Insights:</strong><br>Gain cultural nuances to connect authentically in conversations.</li><li><strong>Real-Life Scenarios:</strong><br>Navigate common situations with confidence-building tools.</li><li><strong>Quiz Assessments:</strong><br>Reinforce learning through quizzes for ongoing skill development.</li></ol><p><strong>Why Take This Course:</strong></p><ul><li><strong>Personal & Professional Growth:</strong><br>Enhance personal connections and gain a professional edge.</li><li><strong>Cultural Fluency:</strong><br>Understand and engage with diverse cultures confidently.</li><li><strong>Life-Long Skill:</strong><br>Develop a valuable skill applicable across various life stages.</li></ul><p>Join 'Everyday Conversational English' and elevate your communication for meaningful connections and success.</p>",
              images: [
                {
                  url: 'https://infyspringboard.onwingspan.com/web/assets/images/infosysheadstart/everyday-conversational-english.png',
                },
              ],
              media: [
                {
                  url: 'https://infyspringboard.onwingspan.com/web/courses/infosysheadstart/everyday-conversational-english/preview/',
                },
              ],
            },
            creator: {
              descriptor: {
                name: 'Prof. Emma Sullivan',
                short_desc:
                  'Experienced language educator dedicated to fostering practical conversational skills and cultural fluency',
                long_desc:
                  "Hello, I'm Prof. Emma Sullivan, your guide in 'Everyday Conversational English.' With over a decade of experience, I'm here to make language learning dynamic and culturally enriching. Let's explore practical communication skills together for personal and professional growth. Join me on this exciting journey!",
                images: [
                  {
                    url: 'https://infyspringboard.onwingspan.com/web/assets/images/infosysheadstart/ins/1.png',
                  },
                ],
              },
            },
            price: {
              currency: 'INR',
              value: '150',
            },
            category_ids: ['LANGUAGE-COURSES', 'SELF-PACED-COURSES'],
            rating: '4.5',
            rateable: true,
            tags: [
              {
                descriptor: {
                  code: 'content-metadata',
                  name: 'Content metadata',
                },
                list: [
                  {
                    descriptor: {
                      code: 'learner-level',
                      name: 'Learner level',
                    },
                    value: 'Beginner',
                  },
                  {
                    descriptor: {
                      code: 'learning-objective',
                      name: 'Learning objective',
                    },
                    value:
                      'By the end of the course, learners will confidently navigate everyday conversations, demonstrating improved fluency, cultural awareness, and effective communication skills.',
                  },
                  {
                    descriptor: {
                      code: 'prerequisite',
                      name: 'Prerequisite',
                    },
                    value: 'Should have a basic understanding of English',
                  },
                  {
                    descriptor: {
                      code: 'prerequisite',
                      name: 'Prerequisite',
                    },
                    value:
                      'Access to a computer or internet to access the course online',
                  },
                  {
                    descriptor: {
                      code: 'lang-code',
                      name: 'Language code',
                    },
                    value: 'en',
                  },
                  {
                    descriptor: {
                      code: 'course-duration',
                      name: 'Course duration',
                    },
                    value: 'P20H',
                  },
                ],
                display: true,
              },
            ],
          },
        ],
        fulfillments: [
          {
            agent: {
              person: {
                name: 'Infosys Springboard',
              },
              contact: {
                email: 'support@infy.com',
              },
            },
          },
        ],
        quote: {
          price: {
            currency: 'INR',
            value: '150',
          },
        },
      },
    },
  };
}

export function courseConfirmResponse(transaction_id: string) {
  return {
    context: {
      domain: 'onest:learning-experiences',
      version: '1.1.0',
      action: 'on_confirm',
      bap_uri: 'https://sample.bap.io/',
      bap_id: 'sample.bap.io',
      bpp_id: 'infosys.springboard.io',
      bpp_uri: 'https://infosys.springboard.io',
      transaction_id: transaction_id,
      message_id: 'd514a38f-e112-4bb8-a3d8-b8e5d8dea82d',
      ttl: 'PT10M',
      timestamp: '2023-02-20T15:21:36.925Z',
    },
    message: {
      order: {
        id: '12424kh',
        provider: {
          id: 'INFOSYS',
          descriptor: {
            name: 'Infosys Springboard',
            short_desc: 'Infosys Springboard Digital literacy program',
            images: [
              {
                url: 'https://infyspringboard.onwingspan.com/web/assets/images/infosysheadstart/app_logos/landing-new.png',
                size_type: 'sm',
              },
            ],
          },
          categories: [
            {
              id: 'LANGUAGE-COURSES',
              descriptor: {
                code: 'LANGUAGE-COURSES',
                name: 'Language Courses',
              },
            },
            {
              id: 'SKILL-DEVELOPMENT-COURSES',
              descriptor: {
                code: 'SKILL-DEVELOPMENT-COURSES',
                name: 'Skill development Courses',
              },
            },
            {
              id: 'TECHNICAL-COURSES',
              descriptor: {
                code: 'TECHNICAL-COURSES',
                name: 'Technical Courses',
              },
            },
            {
              id: 'SELF-PACED-COURSES',
              descriptor: {
                code: 'SELF-PACED-COURSES',
                name: 'Self Paced Courses',
              },
            },
          ],
        },
        items: [
          {
            id: 'd4975df5-b18c-4772-80ad-368669856d52',
            quantity: {
              maximum: {
                count: 1,
              },
            },
            descriptor: {
              name: 'Everyday Conversational English',
              short_desc:
                "Elevate your daily conversations with confidence through our 'Everyday Conversational English' course.",
              long_desc:
                "<p><strong>Course Overview:</strong><br>Welcome to 'Everyday Conversational English,' your key to mastering essential language skills for real-life communication. Tailored for all levels, this course offers:</p><ol><li><strong>Practical Vocabulary:</strong><br>Learn everyday expressions for seamless communication.</li><li><strong>Interactive Role-Playing:</strong><br>Apply knowledge through immersive exercises for real-world scenarios.</li><li><strong>Cultural Insights:</strong><br>Gain cultural nuances to connect authentically in conversations.</li><li><strong>Real-Life Scenarios:</strong><br>Navigate common situations with confidence-building tools.</li><li><strong>Quiz Assessments:</strong><br>Reinforce learning through quizzes for ongoing skill development.</li></ol><p><strong>Why Take This Course:</strong></p><ul><li><strong>Personal & Professional Growth:</strong><br>Enhance personal connections and gain a professional edge.</li><li><strong>Cultural Fluency:</strong><br>Understand and engage with diverse cultures confidently.</li><li><strong>Life-Long Skill:</strong><br>Develop a valuable skill applicable across various life stages.</li></ul><p>Join 'Everyday Conversational English' and elevate your communication for meaningful connections and success.</p>",
              images: [
                {
                  url: 'https://infyspringboard.onwingspan.com/web/assets/images/infosysheadstart/everyday-conversational-english.png',
                },
              ],
              media: [
                {
                  url: 'https://infyspringboard.onwingspan.com/web/courses/infosysheadstart/everyday-conversational-english/preview/',
                },
              ],
            },
            creator: {
              descriptor: {
                name: 'Prof. Emma Sullivan',
                short_desc:
                  'Experienced language educator dedicated to fostering practical conversational skills and cultural fluency',
                long_desc:
                  "Hello, I'm Prof. Emma Sullivan, your guide in 'Everyday Conversational English.' With over a decade of experience, I'm here to make language learning dynamic and culturally enriching. Let's explore practical communication skills together for personal and professional growth. Join me on this exciting journey!",
                images: [
                  {
                    url: 'https://infyspringboard.onwingspan.com/web/assets/images/infosysheadstart/ins/1.png',
                  },
                ],
              },
            },
            price: {
              currency: 'INR',
              value: '150',
            },
            category_ids: ['LANGUAGE-COURSES', 'SELF-PACED-COURSES'],
            rating: '4.5',
            rateable: true,
            'add-ons': [
              {
                id: 'course-outline',
                descriptor: {
                  name: 'Course Outline',
                  long_desc: 'Outline for the course',
                  media: [
                    {
                      mimetype: 'application/pdf',
                      url: 'https://infyspringboard.onwingspan.com/web/courses/infosysheadstart/everyday-conversational-english/outline.pdf',
                    },
                  ],
                },
              },
              {
                id: 'prelim-quiz',
                descriptor: {
                  name: 'Preliminary Quiz',
                  long_desc:
                    'Take this preliminary quiz to see if you will benefit from the course!',
                  media: [
                    {
                      mimetype: 'text/html',
                      url: 'https://infyspringboard.onwingspan.com/web/courses/infosysheadstart/everyday-conversational-english/prelim-quiz',
                    },
                  ],
                },
              },
            ],
            tags: [
              {
                descriptor: {
                  code: 'content-metadata',
                  name: 'Content metadata',
                },
                list: [
                  {
                    descriptor: {
                      code: 'learner-level',
                      name: 'Learner level',
                    },
                    value: 'Beginner',
                  },
                  {
                    descriptor: {
                      code: 'learning-objective',
                      name: 'Learning objective',
                    },
                    value:
                      'By the end of the course, learners will confidently navigate everyday conversations, demonstrating improved fluency, cultural awareness, and effective communication skills.',
                  },
                  {
                    descriptor: {
                      code: 'prerequisite',
                      name: 'Prerequisite',
                    },
                    value: 'Should have a basic understanding of English',
                  },
                  {
                    descriptor: {
                      code: 'prerequisite',
                      name: 'Prerequisite',
                    },
                    value:
                      'Access to a computer or internet to access the course online',
                  },
                  {
                    descriptor: {
                      code: 'lang-code',
                      name: 'Language code',
                    },
                    value: 'en',
                  },
                  {
                    descriptor: {
                      code: 'course-duration',
                      name: 'Course duration',
                    },
                    value: 'P20H',
                  },
                ],
                display: true,
              },
            ],
          },
        ],
        fulfillments: [
          {
            state: {
              descriptor: {
                code: 'NOT-STARTED',
                name: 'Not Started',
              },
              updated_at: '2023-02-06T09:55:41.161Z',
            },
            agent: {
              person: {
                name: 'Infosys Springboard',
              },
              contact: {
                email: 'support@infy.com',
              },
            },
            customer: {
              person: {
                name: 'Jane Doe',
                age: '13',
                gender: 'female',
              },
              contact: {
                phone: '+91-9663088848',
                email: 'jane.doe@example.com',
              },
            },
            stops: [
              {
                id: '0',
                instructions: {
                  name: 'content-video-1',
                  long_desc: 'Description About the Content',
                  media: [
                    {
                      mimetype: 'video/mp4',
                      url: 'https://embedded-video-player-url/play',
                    },
                  ],
                },
              },
              {
                id: '1',
                instructions: {
                  name: 'content-video-2',
                  long_desc: 'Description About the Content',
                  media: [
                    {
                      mimetype: 'video/mp4',
                      url: 'https://embedded-video-player-url/play',
                    },
                  ],
                },
              },
              {
                id: '2',
                instructions: {
                  name: 'content-pdf',
                  long_desc: 'Description About the Content',
                  media: [
                    {
                      mimetype: 'application/pdf',
                      url: 'https://link-to-the-document/',
                    },
                  ],
                },
              },
            ],
            tags: [
              {
                descriptor: {
                  code: 'course-completion-details',
                  name: 'Content Completion Details',
                },
                list: [
                  {
                    descriptor: {
                      code: 'course-certificate',
                      name: 'Course certificate',
                    },
                    value: 'https://link-to-certificate',
                  },
                  {
                    descriptor: {
                      code: 'course-badge',
                      name: 'Course Badge',
                    },
                    value: 'https://link-to-badge',
                  },
                ],
                display: true,
              },
            ],
          },
        ],
        quote: {
          price: {
            currency: 'INR',
            value: '150',
          },
        },
        billing: {
          name: 'Jane Doe',
          phone: '+91-9663088848',
          email: 'jane.doe@example.com',
          address: 'No 27, XYZ Lane, etc',
        },
        payments: [
          {
            params: {
              amount: '150',
              currency: 'INR',
            },
            type: 'PRE-ORDER',
            status: 'PAID',
            collected_by: 'bpp',
          },
        ],
      },
    },
  };
}

export function courseStatusResponse(transaction_id: string) {
  return {
    context: {
      domain: 'onest:learning-experiences',
      version: '1.1.0',
      action: 'on_status',
      bap_uri: 'https://sample.bap.io/',
      bap_id: 'sample.bap.io',
      bpp_id: 'infosys.springboard.io',
      bpp_uri: 'https://infosys.springboard.io',
      transaction_id: transaction_id,
      message_id: 'd514a38f-e112-4bb8-a3d8-b8e5d8dea82d',
      ttl: 'PT10M',
      timestamp: '2023-02-20T15:21:36.925Z',
    },
    message: {
      order: {
        id: '12424kh',
        provider: {
          id: 'INFOSYS',
          descriptor: {
            name: 'Infosys Springboard',
            short_desc: 'Infosys Springboard Digital literacy program',
            images: [
              {
                url: 'https://infyspringboard.onwingspan.com/web/assets/images/infosysheadstart/app_logos/landing-new.png',
                size_type: 'sm',
              },
            ],
          },
          categories: [
            {
              id: 'LANGUAGE-COURSES',
              descriptor: {
                code: 'LANGUAGE-COURSES',
                name: 'Language Courses',
              },
            },
            {
              id: 'SKILL-DEVELOPMENT-COURSES',
              descriptor: {
                code: 'SKILL-DEVELOPMENT-COURSES',
                name: 'Skill development Courses',
              },
            },
            {
              id: 'TECHNICAL-COURSES',
              descriptor: {
                code: 'TECHNICAL-COURSES',
                name: 'Technical Courses',
              },
            },
            {
              id: 'SELF-PACED-COURSES',
              descriptor: {
                code: 'SELF-PACED-COURSES',
                name: 'Self Paced Courses',
              },
            },
          ],
        },
        items: [
          {
            id: 'd4975df5-b18c-4772-80ad-368669856d52',
            quantity: {
              maximum: {
                count: 1,
              },
            },
            descriptor: {
              name: 'Everyday Conversational English',
              short_desc:
                "Elevate your daily conversations with confidence through our 'Everyday Conversational English' course.",
              long_desc:
                "<p><strong>Course Overview:</strong><br>Welcome to 'Everyday Conversational English,' your key to mastering essential language skills for real-life communication. Tailored for all levels, this course offers:</p><ol><li><strong>Practical Vocabulary:</strong><br>Learn everyday expressions for seamless communication.</li><li><strong>Interactive Role-Playing:</strong><br>Apply knowledge through immersive exercises for real-world scenarios.</li><li><strong>Cultural Insights:</strong><br>Gain cultural nuances to connect authentically in conversations.</li><li><strong>Real-Life Scenarios:</strong><br>Navigate common situations with confidence-building tools.</li><li><strong>Quiz Assessments:</strong><br>Reinforce learning through quizzes for ongoing skill development.</li></ol><p><strong>Why Take This Course:</strong></p><ul><li><strong>Personal & Professional Growth:</strong><br>Enhance personal connections and gain a professional edge.</li><li><strong>Cultural Fluency:</strong><br>Understand and engage with diverse cultures confidently.</li><li><strong>Life-Long Skill:</strong><br>Develop a valuable skill applicable across various life stages.</li></ul><p>Join 'Everyday Conversational English' and elevate your communication for meaningful connections and success.</p>",
              images: [
                {
                  url: 'https://infyspringboard.onwingspan.com/web/assets/images/infosysheadstart/everyday-conversational-english.png',
                },
              ],
              media: [
                {
                  url: 'https://infyspringboard.onwingspan.com/web/courses/infosysheadstart/everyday-conversational-english/preview/',
                },
              ],
            },
            creator: {
              descriptor: {
                name: 'Prof. Emma Sullivan',
                short_desc:
                  'Experienced language educator dedicated to fostering practical conversational skills and cultural fluency',
                long_desc:
                  "Hello, I'm Prof. Emma Sullivan, your guide in 'Everyday Conversational English.' With over a decade of experience, I'm here to make language learning dynamic and culturally enriching. Let's explore practical communication skills together for personal and professional growth. Join me on this exciting journey!",
                images: [
                  {
                    url: 'https://infyspringboard.onwingspan.com/web/assets/images/infosysheadstart/ins/1.png',
                  },
                ],
              },
            },
            price: {
              currency: 'INR',
              value: '150',
            },
            category_ids: ['LANGUAGE-COURSES', 'SELF-PACED-COURSES'],
            rating: '4.5',
            rateable: true,
            'add-ons': [
              {
                id: 'course-outline',
                descriptor: {
                  name: 'Course Outline',
                  long_desc: 'Outline for the course',
                  media: [
                    {
                      mimetype: 'application/pdf',
                      url: 'https://infyspringboard.onwingspan.com/web/courses/infosysheadstart/everyday-conversational-english/outline.pdf',
                    },
                  ],
                },
              },
              {
                id: 'prelim-quiz',
                descriptor: {
                  name: 'Preliminary Quiz',
                  long_desc:
                    'Take this preliminary quiz to see if you will benefit from the course!',
                  media: [
                    {
                      mimetype: 'text/html',
                      url: 'https://infyspringboard.onwingspan.com/web/courses/infosysheadstart/everyday-conversational-english/prelim-quiz',
                    },
                  ],
                },
              },
            ],
            tags: [
              {
                descriptor: {
                  code: 'content-metadata',
                  name: 'Content metadata',
                },
                list: [
                  {
                    descriptor: {
                      code: 'learner-level',
                      name: 'Learner level',
                    },
                    value: 'Beginner',
                  },
                  {
                    descriptor: {
                      code: 'learning-objective',
                      name: 'Learning objective',
                    },
                    value:
                      'By the end of the course, learners will confidently navigate everyday conversations, demonstrating improved fluency, cultural awareness, and effective communication skills.',
                  },
                  {
                    descriptor: {
                      code: 'prerequisite',
                      name: 'Prerequisite',
                    },
                    value: 'Should have a basic understanding of English',
                  },
                  {
                    descriptor: {
                      code: 'prerequisite',
                      name: 'Prerequisite',
                    },
                    value:
                      'Access to a computer or internet to access the course online',
                  },
                  {
                    descriptor: {
                      code: 'lang-code',
                      name: 'Language code',
                    },
                    value: 'en',
                  },
                  {
                    descriptor: {
                      code: 'course-duration',
                      name: 'Course duration',
                    },
                    value: 'P20H',
                  },
                ],
                display: true,
              },
            ],
          },
        ],
        fulfillments: [
          {
            state: {
              descriptor: {
                code: 'COMPLETED',
                name: 'COMPLETED',
              },
              updated_at: '2023-02-06T09:55:41.161Z',
            },
            agent: {
              person: {
                name: 'Infosys Springboard',
              },
              contact: {
                email: 'support@infy.com',
              },
            },
            customer: {
              person: {
                name: 'Jane Doe',
                age: '13',
                gender: 'female',
                tags: [
                  {
                    descriptor: {
                      code: 'professional-details',
                      name: 'Professional Details',
                    },
                    list: [
                      {
                        descriptor: {
                          code: 'profession',
                          name: 'profession',
                        },
                        value: 'student',
                      },
                    ],
                    display: true,
                  },
                ],
              },
              contact: {
                phone: '+91-9663088848',
                email: 'jane.doe@example.com',
              },
            },
            stops: [
              {
                id: '0',
                instructions: {
                  name: 'content-video-1',
                  long_desc: 'Description About the Content',
                  media: [
                    {
                      mimetype: 'video/mp4',
                      url: 'https://embedded-video-player-url/play',
                    },
                  ],
                },
              },
              {
                id: '1',
                instructions: {
                  name: 'content-video-2',
                  long_desc: 'Description About the Content',
                  media: [
                    {
                      mimetype: 'video/mp4',
                      url: 'https://embedded-video-player-url/play',
                    },
                  ],
                },
              },
              {
                id: '2',
                instructions: {
                  name: 'content-pdf',
                  long_desc: 'Description About the Content',
                  media: [
                    {
                      mimetype: 'application/pdf',
                      url: 'https://link-to-the-document/',
                    },
                  ],
                },
              },
            ],
            tags: [
              {
                descriptor: {
                  code: 'course-completion-details',
                  name: 'Content Completion Details',
                },
                list: [
                  {
                    descriptor: {
                      code: 'course-certificate',
                      name: 'Course certificate',
                    },
                    value: 'https://link-to-certificate',
                  },
                  {
                    descriptor: {
                      code: 'course-badge',
                      name: 'Course Badge',
                    },
                    value: 'https://link-to-badge',
                  },
                ],
                display: true,
              },
            ],
          },
        ],
        quote: {
          price: {
            currency: 'INR',
            value: '150',
          },
        },
        billing: {
          name: 'Jane Doe',
          phone: '+91-9663088848',
          email: 'jane.doe@example.com',
          address: 'No 27, XYZ Lane, etc',
        },
        payments: [
          {
            params: {
              amount: '150',
              currency: 'INR',
            },
            type: 'PRE-ORDER',
            status: 'PAID',
            collected_by: 'bpp',
          },
        ],
      },
    },
  };
}
