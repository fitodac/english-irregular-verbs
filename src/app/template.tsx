import { ReactNode } from 'react'

export default function Template({ children }: { children: ReactNode }) {
	return (
    <main className="max-w-sm h-screen mx-auto px-6">
      {children}
    </main>
  ) 
}
