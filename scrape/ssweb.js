//Create By RenzMods
const axios = require('axios')
const cheerio = require('cheerio')

exports.ssweb = (url, device = 'desktop') => {
 return new Promise((resolve, reject) => {
const base = 'https://www.screenshotmachine.com'
const param = {
url: url,
device: device,
cacheLimit: 0
}
axios({url: base + '/capture.php',
 method: 'POST',
 data: new URLSearchParams(Object.entries(param)),
 headers: {
'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
 }
}).then((data) => {
 const cookies = data.headers['set-cookie']
 if (data.data.status == 'success') {
axios.get(base + '/' + data.data.link, {
 headers: {
'cookie': cookies.join('')
 },
 responseType: 'arraybuffer'
}).then(({ data }) => {
result = {
status: 200,
result: data
}
 resolve(result)
})
 } else {
reject({ status: 404, statuses: `Link Error`, message: data.data })
 }
}).catch(reject)
 })
}

exports.happymod = (query) => {
	return new Promise((resolve, reject) => {
		axios.get('https://www.happymod.com/search.html?q=' + query)
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const nama = [];
				const link = [];
				const rating = [];
				const thumb = [];
				const format = [];
				$('body > div.container-row.clearfix.container-wrap > div.container-left > section > div > div > h3 > a').each(function(a, b) {
					nem = $(b).text();
					nama.push(nem)
					link.push('https://happymod.com' + $(b).attr('href'))
				})
				$('body > div.container-row.clearfix.container-wrap > div.container-left > section > div > div > div.clearfix > span').each(function(c, d) {
					rat = $(d).text();
					rating.push(rat)
				})
				$('body > div.container-row.clearfix.container-wrap > div.container-left > section > div > a > img').each(function(e, f) {
					thumb.push($(f).attr('data-original'))
				})
				for (let i = 0; i < link.length; i++) {
					format.push({
						title: nama[i],
						thumb: thumb[i],
						rating: rating[i],
						link: link[i]
					})
				}
				const result = {
					creator: 'DGXeon',
					data: format
				}
				resolve(result)
			})
			.catch(reject)
	})
}

exports.happymoddl = async (link) => {
	return new Promise((resolve, reject) => {
		axios.get(link)
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const link = [];
				const jlink = [];
				const result = [];
				const title = $('body > div > div.container-left > section:nth-child(1) > div > h1').text()
				const info = $('body > div > div.container-left > section:nth-child(1) > div > ul').text()
				$('body > div.container-row.clearfix.container-wrap.pdt-font-container > div.container-left > section:nth-child(1) > div > div:nth-child(3) > div > p > a').each(function(a, b) {
					deta = $(b).text();
					jlink.push(deta)
					if ($(b).attr('href').startsWith('/')) {
						link.push('https://happymod.com' + $(b).attr('href'))
					} else {
						link.push($(b).attr('href'))
					}
				})
				for (let i = 0; i < link.length; i++) {
					result.push({
						title: jlink[i],
						dl_link: link[i]
					})
				}
				console.log(link)
				resolve({
					creator: 'DGXeon',
					title: title,
					info: info.replace(/\t|- /g, ''),
					download: link
				})
			})
			.catch(reject)
	})
}
