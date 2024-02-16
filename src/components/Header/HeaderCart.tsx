import { Button } from '@nextui-org/react'
import Link from 'next/link'

export const HeaderCart = (): JSX.Element => {
	return (
		<>
			<Link href="/shop">
				<Button isIconOnly variant="light" color="secondary" size="lg">
					<i className="ri-shopping-cart-2-line ri-xl text-slate-300"></i>
				</Button>
			</Link>
		</>
	)
}
