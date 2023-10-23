import '@styles/globals.css';

export const metadata = {
    title: "WFM",
    description: 'Project Management Tool'
}

export default function RootLayout({ children }) {
  return (
    <html>
        <body>
          <div className='main'>
            <div className="gradient" />
          </div>

            <main className='app'>
                {children}
            </main>
        </body>
    </html>
  )
}
