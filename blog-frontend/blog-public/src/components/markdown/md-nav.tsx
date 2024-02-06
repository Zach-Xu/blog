import { ListBulletIcon } from '@heroicons/react/24/outline';
import React, { useState, useEffect } from 'react';


interface Props {
    markdownRef: React.RefObject<HTMLElement>
}

interface Anchor {
    title: string
    index: string | null
    indent: number
}

const addIdToHeadings = (dom: HTMLElement) => {
    let h2Count = 0
    let h3Count = 0
    let h4Count = 0
    let h5Count = 0
    let h6Count = 0

    const headers: NodeListOf<HTMLElement> = dom.querySelectorAll(
        "h2, h3, h4, h5, h6"
    )
    headers.forEach((item, index) => {
        switch (item.tagName) {
            case 'H2':
                h2Count++
                item.setAttribute("h-id", `${h2Count}`)
                break
            case 'H3':
                h3Count++
                item.setAttribute("h-id", `${h2Count}.${h3Count}`)
                break
            case 'H4':
                h4Count++
                item.setAttribute("h-id", `${h2Count}.${h3Count}.${h4Count}`)
                break
            case 'H5':
                h5Count++
                item.setAttribute("h-id", `${h2Count}.${h3Count}.${h4Count}.${h5Count}`)
                break
            case 'H6':
                h6Count++
                item.setAttribute("h-id", `${h2Count}.${h3Count}.${h4Count}.${h5Count}.${h6Count}`)
                break
            default:
                item.setAttribute("h-id", "unkown")
                break
        }
        item.setAttribute("order", index.toString())
    })

}


const getAnchors = (dom: HTMLElement): Anchor[] => {
    const anchors = dom.querySelectorAll('h2,h3,h4,h5,h6') as NodeListOf<HTMLElement>
    const titles = Array.from(anchors || []).filter((t) => !!t.innerText.trim())
    if (!titles.length) {
        return []
    }
    const hTags = Array.from(new Set(titles.map((t) => t.tagName))).sort()

    return titles.map(item => ({
        // title: `${item.getAttribute('h-id')} ${item.innerText}`,
        title: `${item.innerText}`,
        index: item.getAttribute('order'),
        indent: hTags.indexOf(item.tagName),
    }))

}



const MarkdownNav = ({ markdownRef }: Props) => {

    const [anchors, setAnchors] = useState<Anchor[]>([])

    const [currentIndex, setCurrentIndex] = useState(0)

    // Clicking on anchor
    const handleAnchorClick = (anchor: Anchor, idx: number) => {
        const heading = markdownRef.current?.querySelector(`[order="${anchor.index}"]`) as HTMLElement
        if (heading) {

            window.scrollTo({
                behavior: 'smooth',
                top: heading.offsetTop - 60
            })

            // setCurrentIndex(idx)
        }
    }

    useEffect(() => {
        addIdToHeadings(markdownRef.current!)
        setAnchors(getAnchors(markdownRef.current!))
    }, [markdownRef.current])


    useEffect(() => {

        const handleScroll = () => {
            anchors.forEach((item, idx) => {
                const heading = markdownRef.current?.querySelector(`[order="${item.index}"]`) as HTMLElement

                if (heading && window.scrollY >= heading.offsetTop - 62) {
                    setCurrentIndex(idx);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [anchors, markdownRef.current]);


    return (
        <>
            <div className="flex items-center space-x-2 text-sm pl-5 mb-2">
                <ListBulletIcon className='w-4' />
                <span>Content</span>
            </div>
            <div className="max-h-[calc(100vh-100px)] overflow-auto ">
                {anchors.map((anchor, index) => (
                    <div
                        className={`cursor-pointer mx-[5px] text-sm px-[2px] py-[6px] hover:text-[#ea7e90] ${currentIndex === index ? 'bg-[#ea7e90] text-[#fff] hover:bg-[#49b1f5] hover:text-[#fff]    ' : ''}`}
                        style={{ paddingLeft: `${5 + anchor.indent * 15}px` }}
                        key={anchor.title}
                        onClick={() => handleAnchorClick(anchor, index)}
                    >
                        <a className='text-ellipsis line-clamp-1 pl-3'>{anchor.title}</a>
                    </div>
                ))}
            </div>

        </>
    );
};

export default MarkdownNav
