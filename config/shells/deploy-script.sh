#!/usr/bin/env bash

set -o errexit   # abort on nonzero exitstatus
set -o nounset   # abort on unbound variable
set -o pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FILE="${DIR}/$(basename "${BASH_SOURCE[0]}")"
BASE="$(basename "${FILE}".sh)"
ROOT="$(cd "$(dirname "${DIR}")" && pwd)"

COMMAND="sls deploy"

die () {
  local code=$? 
  local now
  if [ "$1" -ge 0 ] 2>/dev/null; then  # assume $1 is an error code if numeric
    code="$1"
    shift
  fi
  now=$(date +%T.%N)
  echo "$0: ERROR at ${now%???}${1:+: $*}" >&2
  exit "${code}"
}

validateRegion(){
  { [[ "${*}" =~ "--region" ]] || [[ "${*}" =~ "-r" ]]; } || die "region required"
}

validateStage(){
  { [[ "${*}" =~ "--stage" ]] || [[ "${*}" =~ "-s" ]]; } || die "stage required"
}

validateRegion "$@"
validateStage "$@"

# Execute getopt on the arguments passed to this program, identified by the special character $@
PARSED_OPTIONS=$(getopt -n "$0" -o hvfs:r:p: --long "help,verbose,force,stage:,region:,aws-profile:"  -- "$@")

#Bad arguments, something has gone wrong with the getopt command.
[ $? -eq 0 ] || die "Failed to parse options...exiting."
 
# A little magic, necessary when using getopt.
eval set -- "$PARSED_OPTIONS"

# Now goes through all the options with a case and using shift to analyse 1 argument at a time.
#$1 identifies the first argument, and when we use shift we discard the first argument, so $2 becomes $1 and goes again through the case.
while true;
do
  case "$1" in
    -h|--help)
      echo "usage $0 -h -v -f -s -r or $0 --help --verbose --force --stage --region"
      shift
      ;;
    -v|--verbose)
      COMMAND+=" --verbose"
      shift
      ;;
    -f|--force)
      COMMAND+=" --force"
      shift
      ;;
    -s|--stage)
      [[ -n "$2" ]] || die "Stage is required"
      COMMAND+=" --stage $2"
      shift 2
      ;;
    -r|--region)
      [[ -n "$2" ]] || die "Region is required"
      COMMAND+=" --region $2"
      shift 2
      ;;
    -p|--aws-profile)
      COMMAND+=" --aws-profile $2"
      shift 2
      ;;
    --)
      shift
      break;;
    *)
      die "Internal error"
      ;;
  esac
done

echo "${COMMAND}"
eval "${COMMAND}"