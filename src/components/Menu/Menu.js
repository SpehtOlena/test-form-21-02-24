import './Menu.css'

const Menu = ({ menuItems, setActivePage }) => {
	return (
		<ul className={'menu-container'}>
			{
				menuItems.map((value, index) => <li key={index} onClick={() => setActivePage(value.element)}>{value.label.toUpperCase()}</li>)
			}
		</ul>
	)
}
export default Menu