import * as util from 'util'

const exec = util.promisify(require('child_process').exec)

export function command(command: string): Promise<string> {
    return exec(command, { cwd: process.cwd() }).then((resp: any) => {
        const data = resp.stdout.toString().replace(/[\n\r]/g, '')
        return Promise.resolve(data)
    })
}
