import { useState, useEffect, useRef } from 'react'

export default function Chat() {
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([
        { role: 'OLLAMA', content: '나는 Ollama라고 해. 하고싶은 말이 뭐야' },
    ])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const messageContainerRef = useRef<HTMLDivElement>(null)

    // 스크롤 하단으로 유지
    useEffect(() => {
        const container = messageContainerRef.current
        if (container) {
            container.scrollTop = container.scrollHeight
        }
    }, [messages])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return

        const userMessage = { role: 'user', content: input }
        setMessages(prev => [...prev, userMessage])
        setInput('')
        setIsLoading(true)

        try {
            const response = await fetch(`${import.meta.env.VITE_OLLAMA_HOST}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'llama3.2',
                    messages: [...messages, userMessage],
                }),
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const reader = response.body?.getReader()
            const decoder = new TextDecoder('utf-8')
            let fullContent = ''

            while (reader) {
                const { value, done } = await reader.read()
                if (done) break

                const chunk = decoder.decode(value, { stream: true })
                try {
                    const json = JSON.parse(chunk)
                    const assistantContent = json.message?.content || ''
                    fullContent += assistantContent
                } catch (error) {
                    console.error('Error parsing JSON chunk:', error, chunk)
                }
            }

            setMessages(prev => [...prev, { role: 'assistant', content: fullContent }])
        } catch (error) {
            console.error('Error fetching AI response:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl w-full flex flex-col">
                <div
                    ref={messageContainerRef}
                    className="flex-grow overflow-y-scroll mb-4 flex flex-col gap-2"
                    style={{ minHeight: 400 }}
                >
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`p-2 rounded-md ${
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
