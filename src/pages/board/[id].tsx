import { useQuery } from '@tanstack/react-query'
import { getBoardDetail } from 'api/common'
import { useEffect, useState } from 'react'
import { IResponse } from 'types/common'
import { useParams } from 'react-router-dom'
import { IBoardDetail } from 'types/board'

export default function BoardDetail() {
    const { id } = useParams()
    const [detail, setDetail] = useState<IBoardDetail | null>(null)
    const [edit, setEdit] = useState<boolean>(false)
    const { data, isLoading } = useQuery<IResponse>({
        queryKey: ['boardDetail', 'board', id],
        queryFn: () => getBoardDetail(Number(id)),
        enabled: !!id,
    })

    const onEdit = () => {
        setEdit(true)
    }
    const onDelete = () => {
        console.log('delete')
    }

    useEffect(() => {
        if (data?.statusCode === 200) {
            setDetail(data?.data)
        }
    }, [data])

    return (
        <div className="flex flex-col gap-6">
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div className="flex flex-col p-6 gap-4">
                    <div>
                        {!edit ? (
                            <h1 className="text-3xl">{detail?.title}</h1>
                        ) : (
                            <input
                                type="text"
                                value={detail?.title}
                                placeholder="제목 입력"
                                className="border w-full"
                            />
                        )}
                    </div>
                    <div>
                        {!edit ? (
                            detail?.content
                        ) : (
                            <textarea
                                value={detail?.content}
                                placeholder="내용 입력"
                                rows={10}
                                className="border w-full"
                            />
                        )}
                    </div>

                    <div>
                        {detail?.writer}, {detail?.date}, {detail?.views}
                    </div>
                </div>
            )}

            <div className="flex justify-between items-center">
                <div className="flex gap-3">
                    <button onClick={onEdit}>수정</button>
                    <button onClick={onDelete}>삭제</button>
                </div>
                <button>목록</button>
            </div>
        </div>
    )
}
