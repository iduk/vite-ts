import { useQuery } from '@tanstack/react-query'
import { getBoardList } from 'api/common'
import { IBoardList } from 'types/board'
import { IResponse } from 'types/common'

// board list
export default function BoardList() {
    const { data, error, isLoading } = useQuery<IResponse>({
        queryKey: ['boardList', 'board'],
        queryFn: () => getBoardList(),
    })

    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <>
            <h1 className="mb-10">Board List</h1>

            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <table className="table-auto w-full">
                    <colgroup>
                        <col width="5%" />
                        <col width="*" />
                        <col width="15%" />
                        <col width="15%" />
                    </colgroup>
                    <thead className="text-left">
                        <tr>
                            <th className="border-y px-4 py-2 ">번호</th>
                            <th className="border-y px-4 py-2 ">제목</th>
                            <th className="border-y px-4 py-2 ">작성자</th>
                            <th className="border-y px-4 py-2 ">작성일</th>
                            <th className="border-y px-4 py-2 ">조회수</th>
                        </tr>
                    </thead>
                    <tbody className="text-left">
                        {data?.data.map((item: IBoardList, index: number) => (
                            <tr key={index}>
                                <td className="border-b px-4 py-2">{item?.id}</td>
                                <td className="border-b px-4 py-2">
                                    <a href={`/board/${item?.id}`}>{item?.title}</a>
                                </td>
                                <td className="border-b px-4 py-2">{item?.writer}</td>
                                <td className="border-b px-4 py-2">{item?.date}</td>
                                <td className="border-b px-4 py-2">{item?.views}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}
