import '@styles/globals.css';

import Provider from '@components/Provider';


export const metadata = {
    title: "WFM",
    description: 'Project Management Tool'
}

export default function RootLayout({ children }) {
  return (
    <html>
        <body>
          <Provider>
          <div className='main'>
            <div className="gradient" />
          </div>

            <main className='app'>
                {children}
            </main>
            </Provider>
        </body>
    </html>
  )
}
