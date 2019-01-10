let config={
	title:'123',
	template: require('./src/views/layout.pug'),
	appMountId: 'app',
	injectExtrasHead:[{
		tag: 'meta',
		name: 'description',
		content: 'A description of the page'
	},]
}
module.export=config