import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [selected, setSelected] = useState(defaultArticleState);

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': selected.fontFamilyOption.value,
					'--font-size': selected.fontSizeOption.value,
					'--font-color': selected.fontColor.value,
					'--container-width': selected.contentWidth.value,
					'--bg-color': selected.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm selected={selected} setSelected={setSelected} />
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
