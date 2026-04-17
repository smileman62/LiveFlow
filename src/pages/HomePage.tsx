import { useState } from 'react'

function HomePage() {
  const [count, setCount] = useState(0)

  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-6">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold">LiveFlow</h1>
        <p className="mt-2 text-sm text-slate-600">Public Home Page</p>
        <button
          className="mt-6 rounded-md bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500"
          onClick={() => setCount((value) => value + 1)}
        >
          Count is {count}
        </button>
      </div>
    </section>
  )
}

export default HomePage
