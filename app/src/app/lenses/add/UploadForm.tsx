'use client'

import FileUpload from '@/components/FileUpload'
import { Button, FormControl, FormErrorMessage, FormLabel, Icon } from '@/ui'
import { useForm } from 'react-hook-form'
import { FiFile } from 'react-icons/fi'

import { OpenAPI, TemplatesService } from '@/generated'

const { addTemplate } = TemplatesService

OpenAPI.BASE = 'http://localhost:8080'

type FormValues = {
  file_: FileList
}

export default function FileUploadForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>()
  const onSubmit = handleSubmit(async data => {
    try {
      const blob = new Blob([await data.file_[0].text()], {
        type: data.file_[0].type
      })

      await addTemplate(blob)
    } catch (error) {
      throw new Error('Error uploading file')
    }
  })

  const validateFiles = (value: FileList) => {
    if (value.length < 1) {
      return 'Files is required'
    }

    for (const file of Array.from(value)) {
      const fsMb = file.size / (1024 * 1024)
      const MAX_FILE_SIZE = 10
      if (fsMb > MAX_FILE_SIZE) {
        return 'Max file size 10mb'
      }
    }

    return true
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <FormControl isInvalid={!!errors.file_} isRequired>
          <FormLabel>{'File input'}</FormLabel>

          <FileUpload
            accept={'text/yaml'}
            multiple
            register={register('file_', { validate: validateFiles })}
          >
            <Button leftIcon={<Icon as={FiFile} />}>Upload</Button>
          </FileUpload>

          <FormErrorMessage>
            {errors.file_ && errors?.file_.message}
          </FormErrorMessage>
        </FormControl>

        <button>Submit</button>
      </form>
    </>
  )
}
