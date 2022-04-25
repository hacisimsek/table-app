import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const QuoteDetail = () => {
	const { quote_id } = useParams();
	console.log('🚀 ~ file: index.js ~ line 6 ~ QuoteDetail ~ quote_id', quote_id);

	const quote = useSelector((state) => state.case.items).find((item) => item.id === quote_id);
	console.log('🚀 ~ file: index.js ~ line 8 ~ QuoteDetail ~ quote', quote);

	return (
		<div>
			<h1>{quote.quote}</h1>
			<p>{quote.author}</p>
		</div>
	);
};

export default QuoteDetail;
