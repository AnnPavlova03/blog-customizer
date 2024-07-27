import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useCallback, useRef, useState } from 'react';

import styles from './ArticleParamsForm.module.scss';
import { useClickOutside } from './hooks/hooks';

import { RadioGroup } from '../radio-group';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Select } from '../select';
import { Text } from '../text';

export const ArticleParamsForm = ({
	selected,
	setSelected,
}: {
	selected: ArticleStateType;
	setSelected: (value: ArticleStateType) => void;
}) => {
	//открытие aside
	const [isAsideOpen, setIsAsideOpen] = useState(false);
	const handleToggleAside = () => {
		setIsAsideOpen(!isAsideOpen);
	};

	// закрытие по клике вне окна
	const asideRef = useRef<HTMLElement>(null);
	useClickOutside(asideRef, () => {
		if (isAsideOpen)
			setTimeout(() => {
				setIsAsideOpen(false);
			}, 50);
	});

	const resetForm = () => {
		setSelected(defaultArticleState);
		setInputСhange(defaultArticleState);
	};

	// изменения состояние формы
	const [inputСhange, setInputСhange] = useState(selected);

	const handleChange = (newState: ArticleStateType) => {
		setInputСhange(newState);
	};

	const handleSubmit = useCallback(() => {
		setSelected(inputСhange);
	}, [inputСhange]);

	return (
		<>
			<ArrowButton isOpen={isAsideOpen} onClick={handleToggleAside} />
			<aside
				ref={asideRef}
				className={`${styles.container} ${
					isAsideOpen ? styles.container_open : ''
				}`}>
				{isAsideOpen && (
					<form className={styles.form}>
						<div style={{ marginBlockEnd: '50px' }}>
							<Text size={31} weight={800} uppercase align='left'>
								задайте параметры
							</Text>
						</div>
						<div style={{ marginBlockEnd: '50px' }}>
							<Select
								options={fontFamilyOptions}
								title={'Шрифт'}
								selected={inputСhange.fontFamilyOption}
								onChange={(newfontFamily) =>
									handleChange({
										...inputСhange,
										fontFamilyOption: newfontFamily,
									})
								}
							/>
						</div>
						<div style={{ marginBlockEnd: '50px' }}>
							<RadioGroup
								id={selected.fontSizeOption.value}
								name={'fontsize'}
								options={fontSizeOptions}
								selected={inputСhange.fontSizeOption}
								title={'размер шрифта'}
								onChange={(newFontSize) =>
									handleChange({ ...inputСhange, fontSizeOption: newFontSize })
								}
							/>
						</div>
						<div style={{ marginBlockEnd: '100px' }}>
							<Select
								options={fontColors}
								title={'цвет шрифта'}
								selected={inputСhange.fontColor}
								onChange={(newFontColor) =>
									handleChange({ ...inputСhange, fontColor: newFontColor })
								}
							/>
						</div>
						<div style={{ marginBlockEnd: '50px' }}>
							<Select
								options={backgroundColors}
								title={'цвет фона'}
								selected={inputСhange.backgroundColor}
								onChange={(newBackgroundColor) =>
									handleChange({
										...inputСhange,
										backgroundColor: newBackgroundColor,
									})
								}
							/>
						</div>
						<div style={{ marginBlockEnd: '50px' }}>
							<Select
								options={contentWidthArr}
								title={'ширина контента'}
								selected={inputСhange.contentWidth}
								onChange={(newContentWidth) =>
									handleChange({
										...inputСhange,
										contentWidth: newContentWidth,
									})
								}
							/>
						</div>
						<div className={styles.bottomContainer}>
							<Button title='Сбросить' type='reset' onClick={resetForm} />
							<Button title='Применить' type='submit' onClick={handleSubmit} />
						</div>
					</form>
				)}
			</aside>
		</>
	);
};
