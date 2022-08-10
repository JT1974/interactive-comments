import { format } from 'timeago.js'
import DateWrapper from './styles/date'
export default function Date({ date }) {
	return <DateWrapper>{format(date)}</DateWrapper>
}

