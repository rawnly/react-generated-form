import 'bootstrap/dist/css/bootstrap.min.css'

import {
  GeneratedFormConfigProvider
} from 'react-generated-form'

const App = ( { Component, pageProps } ) => (
  <GeneratedFormConfigProvider
    value={{
      input: 'form-control w-100',
      inputGroup: 'd-flex flex-column mb-3',
      label: 'mb-1',
      error: 'text-danger',
      hint: 'text-muted',
      row: 'row',
      sizeClasses: {
        lg: 'col-lg-$',
        md: 'col-md-$',
        xs: 'col-sm-$'
      }
    }}
  >
    <Component {...pageProps} />
  </GeneratedFormConfigProvider>
)
export default App
