export const errorCode: { [key: string]: string } = {
    '400': 'Bad request',
    '401': 'Fail to authenticate',
    '403': 'No permission to perform this action',
    '404': 'Resource not found',
    'default': 'Internal system error, please contact admin'
}

export const errorMessageMap: { [K in keyof WriteArticle as string]: string } = {
    title: 'Title is required',
    summary: 'Summary is required',
    content: 'Content is required',
    categoryId: 'Category is required',
    tagIds: 'At least one tag is requried',
    allowedComment: 'Please specify whether to allow comment',
    pinned: 'Please specify wheter to pin the article'
}