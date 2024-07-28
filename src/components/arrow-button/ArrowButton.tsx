import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';

export type OnClick = () => void;

export const ArrowButton = ({
	onClick,
	isOpen,
}: {
	onClick?: OnClick;
	isOpen?: boolean;
}) => {
	return (
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={`${styles.container} ${isOpen ? styles.container_open : ''}`}
			onClick={(event) => {
				event.stopPropagation();
				if (onClick) {
					onClick();
				}
			}}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={`${styles.arrow} ${isOpen ? styles.arrow_open : ''}`}
			/>
		</div>
	);
};
