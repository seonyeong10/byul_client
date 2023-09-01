import { CurrentPagebar, ListFooter, PageController, Pagebar } from "@components/list";

type PagingType = {
    total: number,
    page: number,
    elements: number,
}

function PagingContainer({ total, page, elements }: PagingType) {
    const basePageArr = [1, 2, 3, 4, 5];
    const pageValue = (page % 5 === 0) ? page / 5 - 1 : Math.floor(page / 5);
    const existRight = (total > 5 && total > pageValue * 5 + 5);
    const existLeft = (total > 5 && page > 5);

    if(elements < 25 && total < 2 ) {
        return null;
    }

    return (
        <ListFooter padding={{ top: 0.8,  bottom: 1 }}>
            {existLeft ? <PageController to="#" className='icon left' /> : null}
            {
                basePageArr.map(p => {
                    const pageNumber = p + pageValue * 5;
                    if (pageNumber <= total) {
                        if(pageNumber === page) {
                            return <CurrentPagebar to="">{pageNumber}</CurrentPagebar>;
                        }
                        return <Pagebar to="">{pageNumber}</Pagebar>;
                    }
                })
            }
            {existRight ? <PageController to="#" className='icon right' /> : null}
        </ListFooter>
    );
}

export default PagingContainer;