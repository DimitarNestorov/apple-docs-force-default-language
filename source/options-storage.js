import OptionsSync from 'webext-options-sync'

export default new OptionsSync({
	defaults: {
		enabled: true,
		language: 'objc',
	},
	migrations: [OptionsSync.migrations.removeUnused],
	logging: process.env.NODE_ENV === 'production',
})
