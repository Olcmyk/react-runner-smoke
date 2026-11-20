import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

function App() {
  const [tested, setTested] = useState(false)

  return (
    <main aria-labelledby="heading">
      <p className="product">GitHub Actions</p>
      <h1 id="heading">React Runner 测试</h1>
      <p className="description">
        这个静态页面用于验证自托管 Runner 能够打包 React 项目。
        现在是15点48
      </p>
      <button type="button" onClick={() => setTested(true)}>测试页面交互</button>
      <p className="status" role="status">{tested ? 'React 交互正常' : ''}</p>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
