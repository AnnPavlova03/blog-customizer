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

interface ArticleParamsFormProps {
	selected: ArticleStateType;
	setSelected: (value: ArticleStateType) => void;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	selected,
	setSelected,
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
		setInputChange(defaultArticleState);
	};

	// изменения состояние формы
	const [inputChange, setInputChange] = useState(selected);

	const handleChange = (newState: ArticleStateType) => {
		setInputChange(newState);
	};

	const handleSubmit = useCallback(() => {
		setSelected(inputChange);
	}, [inputChange]);

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
						<div>
							<Text size={31} weight={800} uppercase align='left'>
								задайте параметры
							</Text>
						</div>
						<div>
							<Select
								options={fontFamilyOptions}
								title={'Шрифт'}
								selected={inputChange.fontFamilyOption}
								onChange={(newfontFamily) =>
									handleChange({
										...inputChange,
										fontFamilyOption: newfontFamily,
									})
								}
							/>
						</div>
						<div>
							<RadioGroup
								id={selected.fontSizeOption.value}
								name={'fontsize'}
								options={fontSizeOptions}
								selected={inputChange.fontSizeOption}
								title={'размер шрифта'}
								onChange={(newFontSize) =>
									handleChange({ ...inputChange, fontSizeOption: newFontSize })
								}
							/>
						</div>
						<div>
							<Select
								options={fontColors}
								title={'цвет шрифта'}
								selected={inputChange.fontColor}
								onChange={(newFontColor) =>
									handleChange({ ...inputChange, fontColor: newFontColor })
								}
							/>
						</div>
						<div>
							<Select
								options={backgroundColors}
								title={'цвет фона'}
								selected={inputChange.backgroundColor}
								onChange={(newBackgroundColor) =>
									handleChange({
										...inputChange,
										backgroundColor: newBackgroundColor,
									})
								}
							/>
						</div>
						<div>
							<Select
								options={contentWidthArr}
								title={'ширина контента'}
								selected={inputChange.contentWidth}
								onChange={(newContentWidth) =>
									handleChange({
										...inputChange,
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
