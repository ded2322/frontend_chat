import './App.scss'
import './reset.scss'
import './global.scss'
import { Header } from './components/Header/Header'
import { Chat } from './components/Chat/Chat'
import { LoginForm } from './components/LoginForm/LoginForm'
import { useSessionStorage } from './hooks/use_session_storage'

function App() {
	const {value} = useSessionStorage('access_token');
	const mainClass = value ? 'main_loggedIn' : 'main_loggedOut';
	return (
		<>
			<main className={mainClass}>
				{value ? (
					<>
						<Header />
						<Chat />
					</>
				) : (
					<LoginForm />
				)}
			</main>
		</>
	)
}

export default App
