export interface LogFile {
    name: string,
    logs: Log[]
}

export interface Log {
    level :string,
    message: string,
    service: string,
    timestamp: string
}
