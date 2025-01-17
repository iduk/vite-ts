import { useEffect, useState } from 'react'
import { getUsers } from 'api/common'

const TestIndex = () => {
    const [users, setUsers] = useState<{ id: number; name: string }[]>([])

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const usersData = await getUsers()
                setUsers(usersData?.data)
            } catch (error) {
                console.error('유저 목록 로드 실패:', error)
            }
        }

        loadUsers()
    }, [])

    return (
        <div>
            <h1>유저 목록</h1>
            <ul>
                {users?.length > 0 ? (
                    users.map(user => <li key={user.id}>{user.name}</li>)
                ) : (
                    <li>데이터가 없습니다.</li>
                )}
            </ul>
        </div>
    )
}

export default TestIndex
