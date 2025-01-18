export default function ProductIndex() {
    return (
        <>
            <h1 className="text-xl font-bold">Product Page</h1>
            <div className="mt-4">
                <h2 className="text-lg font-semibold">Product List</h2>
                <ul className="list-disc pl-6">
                    <li>
                        <a href="/products/1" className="text-blue-500 hover:underline">
                            상품상세 1
                        </a>
                    </li>
                    <li>
                        <a href="/products/2" className="text-blue-500 hover:underline">
                            상품상세 2
                        </a>
                    </li>
                    <li>
                        <a href="/products/3" className="text-blue-500 hover:underline">
                            상품상세 3
                        </a>
                    </li>
                </ul>
            </div>
        </>
    )
}
