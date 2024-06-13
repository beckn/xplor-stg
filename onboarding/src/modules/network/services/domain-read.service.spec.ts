import { Test, TestingModule } from '@nestjs/testing'
import { DomainReadService } from './domain-read.service'

describe('DomainReadService', () => {
  let service: DomainReadService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DomainReadService],
    }).compile()

    service = module.get<DomainReadService>(DomainReadService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should return domains list', async () => {
    const domains = ['domain1', 'domain2']
    jest.spyOn(service, 'getDomainsList').mockResolvedValue(domains)

    const result = await service.getDomainsList()

    expect(result).toEqual(domains)
  })
})
