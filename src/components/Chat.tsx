import { useState } from 'react'

export default function Chat() {
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([
        { role: 'system', content: 'You are a helpful assistant.' },
    ])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return

        // 사용자 메시지를 추가
        const userMessage = { role: 'user', content: input }
        setMessages(prev => [...prev, userMessage])
        setInput('')
        setIsLoading(true)

        try {
            // Ollama API 호출
            const response = await fetch(`${import.meta.env.VITE_OLLAMA_HOST}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'llama2', // 사용할 Ollama 모델
                    messages: [...messages, userMessage], // 이전 메시지 포함
                }),
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const reader = response.body?.getReader()
            const decoder = new TextDecoder('utf-8')
            let content = ''

            while (reader) {
                const { value, done } = await reader.read()
                if (done) break
                content += decoder.decode(value, { stream: true })
                setMessages(prev => [
                    ...prev.slice(0, -1),
                    { ...userMessage },
                    { role: 'assistant', content },
                ])
            }
        } catch (error) {
            console.error('Error fetching AI response:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl w-full">
                <div className="h-96 overflow-y-scroll mb-4">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`p-2 rounded-md mb-2 ${
                                message.role === 'user'
                                    ? 'bg-blue-100 text-blue-900 self-end'
                                    : 'bg-gray-200 text-gray-900 self-start'
                            }`}
                        >
                            <strong>{message.role === 'user' ? 'You' : 'AI'}:</strong>{' '}
                            {message.content}
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-grow p-2 border border-gray-300 rounded-md"
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-400"
                    >
                        {isLoading ? 'Sending...' : 'Send'}
                    </button>
                </form>
            </div>
        </div>
    )
}
