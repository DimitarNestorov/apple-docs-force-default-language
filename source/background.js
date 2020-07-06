import optionsStorage from './options-storage'

const filters = {
	urls: ['https://developer.apple.com/documentation/*'],
}

let language = 'objc'

function onBeforeRequest(details) {
	try {
		const url = new URL(details.url)
		if (url.searchParams.get('language') !== language) {
			url.searchParams.set('language', language)
			return { redirectUrl: url.toString() }
		}
	} catch (error) {
		console.error(error)
	}

	return null
}

function addListener() {
	if (!chrome.webRequest.onBeforeRequest.hasListener(onBeforeRequest)) {
		chrome.webRequest.onBeforeRequest.addListener(onBeforeRequest, filters, ['blocking'])
	}
}

function removeListener() {
	if (chrome.webRequest.onBeforeRequest.hasListener(onBeforeRequest)) {
		chrome.webRequest.onBeforeRequest.removeListener(onBeforeRequest)
	}
}

function reload() {
	optionsStorage.getAll().then(options => {
		language = options.language

		if (options.enabled) {
			addListener()
		} else {
			removeListener()
		}
	})
}

chrome.storage.onChanged.addListener(() => {
	reload()
})

reload()
